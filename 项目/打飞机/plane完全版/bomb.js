// 炸弹相关

// 规定，炸弹最多持有3个，绘制在画布左上角

// 炸弹类
function Bomb(x) {
    this.img = imgs[7];
    this.w = this.img.width;
    this.h = this.img.height;
    this.x = this.w * x;
    this.y = 0;
}

// 绘制方法
Bomb.prototype.draw = function () {
    ctx.beginPath();
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
}

// 对外
function bomb_draw() {
    for (var i = 0; i < bombs.length; i++) {
        var bomb = bombs[i];
        bomb.draw();
    }
}