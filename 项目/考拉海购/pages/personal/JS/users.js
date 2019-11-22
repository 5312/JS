$(function() {
    // 安全控制
    var isok = false,

        lt, // 要修改的地址下标
        layall; //layui接受值
    $('.addressed').hide();
    // console.log(isde)
    // $('.username').hide()
    $('.na').css({
        color: 'red'
    }).click(function() {
        $(this).css({
            color: 'red'
        });
        $('.username').show();
        $('.us').text('我的昵称')
        $('.addressed').hide();
        $('.address').css({
            color: 'black'
        })
    })

    $('.chenge').on('input', function() {
        var regeX = /^[\u4e00-\u9fa5]{2,10}/;
        var te = $(this).val()
        console.log(regeX.test(te));
        if (regeX.test($(this).val())) {
            isok = true;
            $('.ui').text('格式正确').css({
                color: 'green'
            })
        } else {
            isok = false;
            $('.ui').text('格式错误').css({
                color: 'red'
            })
        }
    })
    $('.ok').click(function() {
        if (isok) {
            var uns = JSON.parse(sessionStorage.getItem('nowsign'))
            var orgin = JSON.parse(localStorage.getItem(uns.accs))
            orgin.user = $('.chenge').val();
            localStorage.setItem(uns.accs, JSON.stringify(orgin))
            uns.user = $('.chenge').val();
            sessionStorage.setItem('nowsign', JSON.stringify(uns))
            alert('设置成功')
        }
    })
    $('.address').click(function() {
        $(this).css({
            color: 'red'
        })
        // 点击地址昵称消失
        $('.username').hide();
        $('.us').text('我的收货地址')
        $('.addressed').show();
        $('.na').css({
            color: 'black'
        })

    })

    // 置空
    // var no = JSON.parse(sessionStorage.getItem('nowsign'));
    // var lono = JSON.parse(localStorage.getItem(no.accs));
    // lono.address = [];
    // localStorage.setItem(no.accs, JSON.stringify(lono))

    //
    // 保存新地址
    olds();
    $('.save').click(function() {
        // console.log($(this).text() == '保存新地址')
        if ($(this).text() == '保存新地址') {
            // console.log(layall)
            // 当前登录
            var no = JSON.parse(sessionStorage.getItem('nowsign'));
            // 从local取
            var lono = JSON.parse(localStorage.getItem(no.accs));
            // 当有一项未填写时
            var addarr = {};
            $('.vall').each(function(x, y) {

                if (!$('.vall')[x].value || !layall) {
                    var text = $('.vall')[x]
                    var t1 = $(text).prev().text();
                    alert('请填写' + t1)
                } else {
                    // 所在地区
                    addarr.Region = layall;
                    // 详细地址
                    addarr.Address = $('.vall')[0].value;
                    // 收货人姓名
                    addarr.consigneeName = $('.vall')[1].value;
                    // 手机号码
                    addarr.mobilePhoneNumber = $('.vall')[2].value;
                    // 电话号码
                    addarr.telephoneNumber = $('.vall')[3].value;
                    //  邮箱
                    addarr.postbox = $('.vall')[4].value;
                    addarr.default = false;
                }
            })
            // 当全部输入时，保存地址信息
            if (Object.keys(addarr).length == 7) {
                // 不是第一次保存地址
                if (lono.address) {
                    // 当地址不超过5次
                    if (lono.address.length < 5) {
                        // 所在地区
                        addarr.Region = layall;
                        // 详细地址
                        addarr.Address = $('.vall')[0].value;
                        // 收货人姓名
                        addarr.consigneeName = $('.vall')[1].value;
                        // 手机号码
                        addarr.mobilePhoneNumber = $('.vall')[2].value;
                        // 电话号码
                        addarr.telephoneNumber = $('.vall')[3].value;
                        //  邮箱
                        addarr.postbox = $('.vall')[4].value;
                        // 默认
                        addarr.default = false;
                        // 添加
                        lono.address.push(addarr);
                        localStorage.setItem(no.accs, JSON.stringify(lono))
                        alert('保存成功');
                        // location.href = "";
                        olds();
                    } else {
                        alert('地址已达到上限')
                    }
                } else { // 第一次保存地址
                    lono.address = [addarr];
                    localStorage.setItem(no.accs, JSON.stringify(lono))
                    alert('保存成功');
                    // 刷新网页重载以保存地址
                    // location.href = "";
                    olds();
                }
            }
            // olds();
        } else {
            var nows = JSON.parse(sessionStorage.getItem('nowsign'));
            var lono = JSON.parse(localStorage.getItem(nows.accs));
            // 地址信息
            var loca = lono.address;
            var l = loca[lt];
            // 修改地址
            l.Address = $('.vall')[0].value;
            l.Region = layall;
            l.consigneeName = $('.vall')[1].value;
            l.mobilePhoneNumber = $('.vall')[2].value;
            l.postbox = $('.vall')[4].value;
            l.telephoneNumber = $('.vall')[3].value;
            localStorage.setItem(nows.accs, JSON.stringify(lono))
            alert('修改成功')
            $('.save').text('保存新地址')
            // location.reload();
            olds();
        }
    })
    //配置插件目录
    layui.config({
        base: './layuiaddress/mods/',
        version: '1.0'
    });
    //一般直接写在一个js文件中
    layui.use(['layer', 'form', 'layarea'], function() {
        var layer = layui.layer,
            form = layui.form,
            layarea = layui.layarea;

        layarea.render({
            elem: '#area-picker',
            change: function(res) {
                //选择结果
                console.log(res);
                layall = res;
            }
        });
    });
    //注意：导航 依赖 element 模块，否则无法进行功能性操作
    layui.use('element', function() {
        var element = layui.element;

        //…
    })
    // 修改按钮
    $('.old').click(function(e) {
        var nows = JSON.parse(sessionStorage.getItem('nowsign'));
        var lono = JSON.parse(localStorage.getItem(nows.accs));
        // 地址信息
        var loca = lono.address;
        var ev = e || window.event;
        var target = e.target || e.srcElement;
        // console.log(target.parentNode)
        // 返回当前点击的下标等于服务器上的下标
        if (target.className == 'change') { //点击修改按钮时
            // 点击修改时资料填入下面
            $('html').animate({
                scrollTop: 600
            })
            $('.save').text('修改地址')
            var text = target.parentNode.parentNode;
            // 下标对应于local
            var t1 = $(text).attr('index-id');
            lt = t1;
            // 要修改的地址
            var ll = loca[t1];
            //旧地址自动填入
            $('.vall:eq(0)').val(ll.Address);
            $('.vall:eq(1)').val(ll.consigneeName);
            $('.vall:eq(2)').val(ll.mobilePhoneNumber);
            $('.vall:eq(3)').val(ll.telephoneNumber);
            $('.vall:eq(4)').val(ll.postbox);
            // var reg = ll.Region
            // console.log(reg.province)
            $('.layui-input:eq(0)').val(ll.Region.province);
            $('.layui-input:eq(1)').val(ll.Region.city)
            $('.layui-input:eq(2)').val(ll.Region.county)
            // console.log($('.layui-input'))
        }
    })
    //阻止浏览器默认右键点击事件
    // $(".old").bind("contextmenu", function() {
    //     return false;
    // })

    $('.old').on('click', '.paren', function(e) {
        // console.log(e.which)
        if (confirm('是否设为默认地址？')) {
            var indexId = $(this).attr('index-id');
            // var indexId = $(target).index() - 1;
            console.log(indexId)
            // console.log($(target).index() - 1)
            dell(indexId);
            defaul();
        }
    })
})
// 右键设置默认
//这一步是为了阻止右击时系统默认的弹出框
// document.getElementsByClassName('old')[0].oncontextmenu = function(e) {
//     e.preventDefault();
// };
//定义事件的函数
// document.getElementsByClassName('old')[0].onmouseup = function(oEvent) {
//     if (!oEvent) oEvent = window.event;
//     var target = oEvent.target || oEvent.srcElement;
//     if (oEvent.button == 2) {
//         if (confirm('是否设为默认地址？')) {
//             var indexId = $(target).attr('index-id');
//             // var indexId = $(target).index() - 1;
//             console.log(indexId)
//             // console.log($(target).index() - 1)
//             dell(indexId);
//             defaul();
//         }
//     }
// }
function olds() {
    $('.old').empty().html('<div class="bar"><span>收货人</span><span>收货地址</span><span>联系电话</span><span>操作</span><div class="defaults"></div></div>')
    //  旧地址渲染
    var nows = JSON.parse(sessionStorage.getItem('nowsign'));
    var lono = JSON.parse(localStorage.getItem(nows.accs));
    // 地址信息
    var loca = lono.address;
    if (loca) {
        $.each(loca, function(x, y) {
            $('<div class="paren"><span class="receive0">收货人</span><span class="receive1">收货地址</span ><span class="receive2">联系电话</span><span class="receive3"><span class="change">修改</span>|<span class="splice">删除</span></span><div class="default">默认地址</div></div>').appendTo($('.old'));
            // console.log(y)
            $('.receive0')[x].innerHTML = y.consigneeName;
            $('.receive1')[x].innerHTML = y.Region.province + y.Region.city + y.Region.county + y.Address;
            $('.receive2')[x].innerHTML = y.mobilePhoneNumber;
            // console.log(x, loca.length - 1)
            // def(x);
        })
        defaul();
        // 有旧地址的时候才可以修改删除
        $('.paren').each(function(x, y) {
            $(this).attr('index-id', x)
        })

        // 删除
        $('.splice').each(function(x, y) {
            $(y).click(function() {
                // console.log($(this).parent().parent().remove());
                $(this).parent().parent().remove();
                var nows = JSON.parse(sessionStorage.getItem('nowsign'));
                var lono = JSON.parse(localStorage.getItem(nows.accs));
                var loca = lono.address;
                loca.splice(x, 1);
                localStorage.setItem(nows.accs, JSON.stringify(lono));
                if (!spce()) {
                    loca[loca.length - 1].default = true;
                    localStorage.setItem(nows.accs, JSON.stringify(lono))
                }
                olds();

            })
        })
    }
    // jq
}

// 删除默认地址
function spce() {
    var nows = JSON.parse(sessionStorage.getItem('nowsign'));
    var lono = JSON.parse(localStorage.getItem(nows.accs));
    var loca = lono.address;
    for (var i = 0; i < loca.length; i++) {
        if (loca[i].default) {
            return true;
        }
    }
}

// 默认地址设置
// function def(index) {
//     var nows = JSON.parse(sessionStorage.getItem('nowsign'));
//     var lono = JSON.parse(localStorage.getItem(nows.accs));
//     // 地址信息
//     var loca = lono.address;
//     // console.log(isde)
//     $.each(loca, function(x, y) {
//         y.default = false;
//     })
//     // 默认最后一个为新地址
//     if (index == loca.length - 1) {
//         loca[x].default = true;
//         localStorage.setItem(nows.accs, JSON.stringify(lono));
//         defaul();
//     }
//
// }

// 点击设置默认地址
function dell(i) {
    var nows = JSON.parse(sessionStorage.getItem('nowsign'));
    var lono = JSON.parse(localStorage.getItem(nows.accs));
    // 地址信息
    var loca = lono.address[i];
    $.each(lono.address, function(x, y) {
        y.default = false;
    })
    loca.default = true;
    localStorage.setItem(nows.accs, JSON.stringify(lono))
}

// 默认地址的显示
function defaul() {
    var nows = JSON.parse(sessionStorage.getItem('nowsign'));
    var lono = JSON.parse(localStorage.getItem(nows.accs)).address;
    $.each(lono, function(x, y) {
        $('.default')[x].setAttribute('class', 'default')
        // console.log(y)
        if (y.default) {
            var yu = document.getElementsByClassName('default');
            $('.default')[x].setAttribute('class', 'default db')
        }
    })

}