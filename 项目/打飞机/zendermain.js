var cv = document.querySelector('#canvas')
var ctx = cv.getContext('2d')

var falg = 0; //图片加载数量
var img = []; //全部图片
/**
 * [ImgSrc description] 图片集中处理
 * @constructor
 */
function ImgSrc() {
    this.back = './img/background.png';
    this.bomb = './img/bomb.png';
    this.bullet1 = './img/bullet1.png';
    this.enemy1 = './img/enemy1.png';
    this.enemy2 = './img/enemy2.png';
    this.enemy3 = './img/enemy3.png';
    this.herofly = './img/herofly.png';
    this.prop = './img/prop.png';
}
var src = new ImgSrc(); //构造图片路径

for (var x in src) {
    img[x] = new Image();
    img[x].src = src[x];
}
for (var x in img) {
    img[x].onload = function() {
        falg++;
        if (falg == 8) {
            console.log('图片加载完成');
            flay.main(img) // 主函数 定时器
            // var f = new Foe('enemy1', 38, 34)
            // console.log(f)
            // f.beget();
        }
    }
}

function Flay() {
    cv.width = 320;
    cv.height = 568;
    this.play = false; //游戏开始
    this.foe = [] // 敌方飞机
    this.bullet = [] //子弹；
}
var flay = new Flay();

/**
 * [description]
 * @param  {[type]} img [description]
 * @return {[type]}     [description]
 */

/**
 * [背景绘制]
 * @return {[type]} [description]
 */
Flay.prototype.main = function(img) {
    //背景
    clearInterval(time)
    ctx.drawImage(img.back, 0, 0, cv.width, cv.height);
    ctx.drawImage(img.back, 0, -cv.height, cv.width, cv.height);
    var y = 0;
    var y2 = -cv.height,
        that = this;
    // time
    var time = setInterval(function() {
        // 清空画布　背景渲染
        cv.width = cv.width;
        y = y > cv.height ? 0 : ++y;
        y2 = y > cv.height ? -cv.height : ++y2
        ctx.drawImage(img.back, 0, y, cv.width, cv.height);
        ctx.drawImage(img.back, 0, y2, cv.width, cv.height);
        // 我的飞机
        my.show();
        // 飞机移动
        my.mainplain();

    }, 20)
};

Flay.prototype.rnbeget = function(img) {
    // 概率
    var num = rn(0, 100);
    if (num > 98) {
        var num = rn(0, 100);
        if (num <= 70) {
            this.foe.push(new Foe('enemy1', 38, 34))
            return
        }
        if (num > 70 && num < 75) {
            this.foe.push(new Foe('enemy2', 110, 160))
            return
        }
        if (num >= 75) {
            this.foe.push(new Foe('enemy3', 46, 60))
            return
        }
    }

}
// 敌方飞机
function Foe(en, fw, fh) {
    this.en = en
    this.mode = 0;
    this.fw = fw;
    this.fy = -100;
    this.fh = fh;
    this.sp = rn(2, 4);
    this.fx = rn(0, cv.width - this.fw)
}
Foe.prototype.beget = function() {
    this.fy += this.sp;
    ctx.drawImage(img[this.en], this.fw * this.mode, 0, this.fw, this.fh, this.fx, this.fy, this.fw, this.fh);
};


/**
 * [Myplain description]飞机
 * @constructor
 */
function Myplain() {
    this.x = 0;
    this.y = 0;
    this.w = 66; //飞机宽
    this.h = 82; //飞机高
    // 图片截取起始位置即　飞机状态
    this.a = 1;
    // 按键安全判断
    this.down = false;
    this.move = ['null', 'null', 'null', 'null'];
    this.num = 'one'; //子弹样式
    // 子弹间隔
    this.gap = 0;
}
// 继承
Myplain.prototype = new Flay();
Myplain.prototype.constructor = Myplain;

Myplain.prototype.show = function() { //飞机显示
    ctx.drawImage(img.herofly, this.w * this.a, 0, this.w, this.h, this.x, this.y, 66, this.h);
};
Myplain.prototype.mainplain = function() { //飞机移动　
    var xmax = cv.width - this.w;
    var ymax = cv.height - this.h;
    var that = this
    if (that.down) {
        //当开始动画完成后才能移动
        if (that.move[0] == 'left') {
            that.a = 0; //飞机状态
            that.x = that.x <= 0 ? 0 : that.x -= 5 //边界判断
        }
        if (that.move[1] == 'top') {
            that.a = 0; //飞机状态
            that.y = that.y <= 0 ? 0 : that.y -= 5; //边界判断
        }
        if (that.move[2] == 'right') {
            that.a = 0; //飞机状态
            that.x = that.x >= xmax ? xmax : that.x += 5; //边界判断
        }
        if (that.move[3] == 'bottom') {
            that.a = 0; //飞机状态
            that.y = that.y >= ymax ? ymax : that.y += 5; //边界判断
        }
        // 敌方飞机
        that.rnbeget()
        for (var i = 0; i < that.foe.length; i++) {
            that.foe[i].beget();
            if (that.foe[i].fy > 568) {
                that.foe.splice(i, 1); //飞出画布后删除
            }
        }
        // 子弹
        that.gap++; //控制子弹出现间隔
        if (that.gap > 5) {
            that.bullet.push(new Bullet(that)) //创建啊子弹并放进数组
            that.gap = 0;
        }
        for (var i = 0; i < that.bullet.length; i++) {
            that.bullet[i].go();
            if (that.bullet[i].by < -20) {
                that.bullet.splice(i, 1);
            }
        }
        //
    }
};
Myplain.prototype.animat = function() { //飞机动画
    clearInterval(start)
    var that = this;
    var xmax = cv.width / 2 - this.w / 2;
    var ymax = cv.height - this.h;
    // start
    var start = setInterval(function() {
        that.x = that.x >= xmax ? xmax : that.x += 5;
        that.y = that.y >= ymax ? ymax : that.y += 5;
        if (that.x == xmax && that.y == ymax) {
            clearInterval(start); //开机动画完成
            that.down = true;
        }
    }, 20)
};
var my = new Myplain();

//子弹构造函数
function Bullet(that) {
    this.bw = 6;
    this.bh = 14;
    if (that.num == 'one') {
        //单子弹　 出生点　我的飞机顶部
        this.bx = that.x + that.w / 2 - 2;
        this.by = that.y - 0;
    } else if (that.num == 'tow') {}
}
Bullet.prototype.go = function() {
    this.by -= 5;
    ctx.drawImage(img.bullet1, 0, 0, this.bw, this.bh, this.bx, this.by, this.bw, this.bh)
};


function rn(x, y) {
    return Math.round(Math.random() * (y - x) + x);
}
/**
 * [description] 键盘时间监听
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
document.onkeydown = function(e) {
    var e = e || window.event;
    // wsad ＆＆　上下左右
    switch (e.keyCode) {
        case 32:
            // 游戏开始
            my.animat();

            break;
        case 65:
        case 37:
            // 左键
            my.move[0] = 'left';
            break;
        case 87:
        case 38:
            my.move[1] = 'top';
            break;
        case 68:
        case 39:
            my.move[2] = 'right';
            break;
        case 83:
        case 40:
            my.move[3] = 'bottom';
            break;
        default:

    }
}
//空格开始
document.onkeyup = function(e) {
    var e = e || window.event;
    switch (e.keyCode) {
        case 65:
        case 37:
            // 左键
            my.move[0] = 'null';
            my.a = 1;
            break;
        case 87:
        case 38:
            my.move[1] = 'null';
            my.a = 1;
            break;
        case 68:
        case 39:
            my.move[2] = 'null';
            my.a = 1;
            break;
        case 83:
        case 40:
            my.move[3] = 'null';
            my.a = 1;
            break;
        default:

    }
}