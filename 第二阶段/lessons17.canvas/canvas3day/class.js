var cv = document.querySelector('#main');
var ctx = cv.getContext('2d');
var timer;

// 画布
function Canvas() {
    this.w = cv.width; //宽
    this.h = cv.height; //高
    this.unit = 25; //每格子大小
    this.rownum = cv.width / 25; //横向几格
    this.colnum = cv.height / 25; //竖几格
}
Canvas.prototype.rn = function(x, y) {
    return Math.round(Math.random() * (y - x) + x) % this.unit;
};
Canvas.prototype.color = function() {
    return Math.round(Math.random() * 2)
};
// 食物对象
function Foot() {
    this.x;
    this.y;
    this.w = 25;
    this.h = 25;
    this.arr = ['red', 'blue', 'green']
    this.c = this.arr[this.color()];
    this.a = this.rn(0, cv.width) * 25;
    this.b = this.rn(0, cv.height) * 25;
}
Foot.prototype = new Canvas();
Foot.prototype.constructor = Foot;

Foot.prototype.show = function() {
    ctx.beginPath();
    // console.log(this.color())
    ctx.fillStyle = this.c;
    ctx.fillRect(this.a, this.b, this.w, this.h)
    ctx.fill()
};
// 蛇
function Snake() {
    this.x = cv.width / 2;
    this.y = cv.height / 2;
    this.w;
    this.h;
    this.log = 5;
    this.path = 'right';
    this.speed = 400; //速度
    this.bodys = [];
    this.bodyl = 3;
}
Snake.prototype = new Foot();
Snake.prototype.constructor = Snake;
// 画蛇
Snake.prototype.drawSnake = function() {
    cv.width = cv.width;
    ctx.beginPath();
    ctx.fillStyle = 'red'
    ctx.fillRect(this.x, this.y, this.w, this.h) //画蛇头
};
Snake.prototype.drawBody = function() {
    // 画蛇身体
    for (var i = this.bodys.length - 1; i >= 0; i--) {
        ctx.beginPath();
        ctx.fillStyle = 'yellow'
        ctx.fillRect(this.bodys[i][0], this.bodys[i][1], this.w, this.h)
    }
};
// 蛇的移动方向
Snake.prototype.paths = function() {
    this.bodys.push([this.x, this.y]); //蛇头的之前位置
    if (this.bodys.length > this.bodyl) {
        this.bodys.shift();
        // 长度
    }
    if (this.path == 'right') {
        s.x += this.unit;
    }
    if (this.path == 'left') {
        s.x -= this.unit;
    }
    if (this.path == 'top') {
        s.y -= this.unit;
    }
    if (this.path == 'bottom') {
        s.y += this.unit;
    }
};
Snake.prototype.dei = function() {
    for (var i = 0; i < this.bodys.length; i++) {
        var sd = this.bodys[i];
        if (this.x == sd[0] && this.y == sd[1]) {
            // 吃到自己
            // clearInterval(timer);
            over();
        }
    }
    if (this.y > cv.height - this.h) {
        this.y = 0;
    }
    if (this.y < 0) {
        this.y = cv.height;
    }
    if (this.x > cv.width - this.w) {
        this.x = 0;
    }
    if (this.x < 0) {
        this.x = cv.width;
    }
};

//
Snake.prototype.start = function() {
    this.dei();
    //
    cv.width = cv.width;
    ctx.beginPath();
    ctx.font = '50px 宋体';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('GAME OVER', cv.width / 2, cv.height / 2);
    ctx.fill();
    //
    this.w = this.unit - 2;
    this.h = this.unit - 2;
    s.paths();
    this.drawSnake();
    this.drawBody();
    this.show();
    // 碰撞检测
    if (crash(this, this)) {
        if (this.c == 'blue') {
            this.speed -= 200;
            this.speed = this.speed <= 0 ? 50 : this.speed;
            this.init(this)
        }
        if (this.c == 'red') {
            this.speed += 20;
            this.init(this)
        }
        if (this.c == 'green') {
            this.bodyl++;
        }
        // 换位置
        this.a = this.rn(0, 900) * 25;
        this.b = this.rn(0, 800) * 25;
        // 换颜色
        this.c = this.arr[this.color()];
    }

};

Snake.prototype.init = function(ther) {
    clearInterval(timer);
    var that = this;
    timer = setInterval(function() {
        that.start();
    }, ther.speed)
};
Snake.prototype.open = function(un) {
    cv.width = un.width || 900;
    cv.height = un.height || 800;
    this.init(this)
};

function crash(s1, f) {
    var sl = s1.x + 12,
        sr = s1.y + 12;
    var fl = f.a,
        fr = f.b;
    if (sl > fl && sl < fl + 25 && sr > fr && sr < fr + 25) {
        return true;
    }
}
var s = new Snake();

$(document).on('keydown', function(e) {
    switch (e.keyCode) {
        case 37:
            if (s.path != 'right') { //同向检测
                s.path = 'left';
            }
            break;
        case 38:
            if (s.path != 'bottom') {
                s.path = 'top';
            }

            break;
        case 39:
            if (s.path != 'left') {
                s.path = 'right'
            }
            break;
        case 40:
            if (s.path != 'top') {
                s.path = 'bottom'
            }
            break;
    }

})

function over() {
    clearInterval(timer);
    timer = null;
    $('#cv').fadeOut(1000).delay(200).fadeIn(500);
    setTimeout(function() {
        cv.width = cv.width;
        ctx.beginPath();
        ctx.font = '100px 宋体';
        ctx.fillStyle = 'gold';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('游戏结束', cv.width / 2, cv.height / 2);
    }, 1000)
}