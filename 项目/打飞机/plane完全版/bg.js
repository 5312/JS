// 与背景相关

// 背景类
function Bg() {
    this.y = 0;//y坐标，用于背景移动
    this.img = imgs[0];//加载好资源的背景图对象，用于绘制
}
// 移动方法
Bg.prototype.move = function () {
    this.y += 3;
    if (this.y >= cvh) {
        this.y = 0;
    }
}
// 绘制方法
Bg.prototype.draw = function () {
    this.move();
    ctx.beginPath();
    ctx.drawImage(this.img, 0, this.y - cvh, cvw, cvh);
    ctx.drawImage(this.img, 0, this.y, cvw, cvh);
}
// 绘制得分
Bg.prototype.score = function () {
    ctx.beginPath();
    ctx.font = '30px 宋体';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    ctx.fillText(score, cvw, 0);
}