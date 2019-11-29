var jq = document.createElement('script'),
    head = document.getElementsByTagName('head')[0];
jq.src = "https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js";
head.appendChild(jq);
var pop;
window.onload = function() {
    // 弹窗类
    function Popups() {
        this.title = '信息';
        this.content = ''; //内容
        this.area = [];
        this.btn = [];
        this.yes = null;
        this.cancel = null;
    }
    Popups.prototype.open = function(virtue) {
        this.title = virtue.title || '信息';
        this.content = virtue.content || '';
        this.area = virtue.area; //宽高
        this.btn = virtue.btn; //按钮
        this.yes = virtue.yes;
        this.create(); //创建弹窗

    };
    // 开启
    Popups.prototype.create = function() {
        var wrap = $('<div class="pop-wrap"></div>').appendTo('body');
        // 默认内容撑开，有就设置
        this.position(wrap);
        var tit = $('<div class="pop-head"></div>').appendTo(wrap);
        var content = $('<div class="pop-content"></div>').appendTo(wrap);
        var floot = $('<div class="pop-bottom"></div>').appendTo(wrap);

        // 按钮
        if (this.btn) { //设置
            for (var i = this.btn.length - 1; i >= 0; i--) {
                var btn = $('<div class="pop-button"></div>').text(this.btn[i]).appendTo(floot);
            }
        } else { //没设置默认
            var btn = $('<div class="pop-button"></div>').text('确定').appendTo(floot);
        }
        this.click(floot);
        if (!this.area) {
            floot.css({
                position: 'relative'
            })
        }
        tit.text(this.title);
        content.text(this.content)

    };
    // 点击按钮
    Popups.prototype.click = function(floot) {
        // 点击事件
        if (!this.yes) { //没设置回调则默认关闭)
            $(floot).on('click', '.pop-button', function() {
                $('.pop-wrap').remove();
            });
        } else { //设置回调则回调
            $(floot).on('click', '.pop-button', this.yes);
        }
    }
    // 当默认属性被覆盖时
    Popups.prototype.position = function(wrap) {
        // 默认定位
        var stop = $(window).height();
        var t = stop / 2 - wrap.height() / 2 - 100;
        var ls = $(window).width();
        var l = ls / 2 - wrap.width() / 2;

        wrap.css({
            top: t,
            left: l
        });
        if (this.area) {
            wrap.css({
                width: this.area[0],
                height: this.area[1]
            });
            // 设置宽高后，重定位
            var stop = $(window).height();
            var t = stop / 2 - wrap.height() / 2;
            var ls = $(window).width();
            var l = ls / 2 - wrap.width() / 2;
            wrap.css({
                top: t,
                left: l
            });
        }

    };
    pop = new Popups();

}