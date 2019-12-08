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
/**
 * [description]
 * @param  {[type]} img [description]
 * @return {[type]}     [description]
 */
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
            this.foe.push(new Foe('prop', 39, 68, 2))
            return
        }
        if (num >= 75) {
            this.foe.push(new Foe('enemy3', 46, 60));
            this.foe.push(new Foe('prop', 39, 68, 1))
            return
        }
    }
    var n = rn(0, 1000)
    if (n > 999) {
        this.foe.push(new Foe('prop', 39, 68, 0));
        return;
    }

}
// 敌方飞机
function Foe(en, fw, fh, m) {
    this.en = en
    this.mode = m || 0;
    this.fw = fw;
    this.fy = -100;
    this.fh = fh;
    this.sp = rn(2, 4);
    this.fx = rn(0, cv.width - this.fw);
    this.worn = 0;
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

Myplain.prototype.worns = function(en, i, mx, my) {
    if (!en) {
        return
    }
    var ins = en.worn;
    // 击中后删除
    switch (en.en) {
        case 'enemy1':
            if (ins > 3) {
                en.mode++;
                if (en.mode > 4) {
                    this.foe.splice(i, 1)
                }
            }
            break;
        case 'enemy2':
            if (ins > 20) {
                en.mode++;
                if (en.mode > 8) {
                    this.foe.splice(i, 1)
                }
            }
            break;
        case 'enemy3':
            if (ins > 10) {
                en.mode++;
                if (en.mode > 4) {
                    this.foe.splice(i, 1)
                }
            }
            break;
        case 'prop':
            if (en.mode == 1) {
                if (en.fx > mx && en.fx + 39 < mx + 66 && my < en.fy + 68 && my > en.fy) {
                    this.num = 'two';
                    this.foe.splice(i, 1);
                }
            }
        default:

    }
};
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
            if (that.foe[i].fy > 600) {
                that.foe.splice(i, 1); //飞出画布后删除
            };
            that.worns(that.foe[i], i, that.x, that.y); //敌机变化
        }

        // 子弹
        that.gap++; //控制子弹出现间隔
        if (that.gap > 5) {
            that.bullet.push(new Bullet(that, 'l')) //创建啊子弹并放进数组
            that.bullet.push(new Bullet(that, 'r')) //创建啊子弹并放进数组
            that.gap = 0;
        }
        for (var i = 0; i < that.bullet.length; i++) {
            that.bullet[i].go();
            if (that.bullet[i].by < -20) {
                that.bullet.splice(i, 1);
            }
            // 碰撞检测
            for (var j = 0; j < that.foe.length; j++) {
                // 敌机
                var foe = that.foe[j];
                var xl = foe.fx,
                    xr = foe.fx + foe.fw;
                var yt = foe.fy,
                    yb = foe.fy + foe.fh;
                var bullet = that.bullet[i];
                if (foe.en != 'prop') {
                    // 双子弹
                    if (this.num == 'two') {
                        if (!bullet) {
                            return
                        }
                        var bxl = bullet.bx1 + 3,
                            byt = bullet.by;
                        if (bxl > xl && bxl < xr && byt < yb && byt > yt) {
                            that.bullet.splice(i, 1);
                            foe.worn++;
                            break;
                        }
                        var bxr = bullet.bx2 + 3,
                            byt = bullet.by;
                        if (bxr > xl && bxr < xr && byt < yb && byt > yt) {
                            that.bullet.splice(i, 1);
                            foe.worn++;
                            break;
                        }
                    } else {
                        // 单子弹
                        var bxl = bullet.bx + 3,
                            byt = bullet.by;
                        if (bxl > xl && bxl < xr && byt < yb && byt > yt) {
                            that.bullet.splice(i, 1);
                            foe.worn++;
                            break;
                        }
                    }
                }

            }

        }
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
function Bullet(that, content) {
    this.bw = 6;
    this.bh = 14;
    this.t = 'one'
    this.site = content || 'middle';
    if (that.num == 'one') {
        //单子弹　 出生点　我的飞机顶部
        this.bx = that.x + that.w / 2 - 2;
        this.by = that.y;
    } else if (that.num == 'two') {
        this.t = 'two';
        this.bx1 = that.x + 7;
        this.bx2 = that.x + 55;
        this.by = that.y;
    }
}
Bullet.prototype.go = function() {
    this.by -= 5;
    if (this.t == 'one') {
        ctx.drawImage(img.bullet1, 0, 0, this.bw, this.bh, this.bx, this.by, this.bw, this.bh)
    } else if (this.t == 'two') {
        if (this.site == 'l') {
            ctx.drawImage(img.bullet1, 0, 0, this.bw, this.bh, this.bx1, this.by, this.bw, this.bh);
        }
        if (this.site == 'r') {
            ctx.drawImage(img.bullet1, 0, 0, this.bw, this.bh, this.bx2, this.by, this.bw, this.bh);
        }

    }
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