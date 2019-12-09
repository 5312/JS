// 与我方飞机相关

// 我方飞机类
function Hero() {
    this.img = imgs[1];//我方飞机加载完资源的图片对象，用于绘制
    this.w = this.img.width / 5;//我方飞机的宽度
    this.h = this.img.height;//我方飞机的高度
    this.x = (cvw - this.w) / 2;//我方飞机的x坐标
    this.y = (cvh - this.h) / 2;//我方飞机的y坐标
    this.index = 1;//表示我方飞机图片截取的下标
    this.left = false;//控制飞机移动方向的变量
    this.right = false;
    this.up = false;
    this.down = false;
    this.speed = 3;
    this.die = false;
}

// 绘制方法
Hero.prototype.draw = function () {
    this.move();
    ctx.beginPath();
    ctx.drawImage(this.img, this.w * this.index, 0, this.w, this.h, this.x, this.y, this.w, this.h);
}

// 移动方法
Hero.prototype.move = function () {
    if(this.die){
        return;
    }

    // 移动
    if (this.left) this.x -= this.speed;
    if (this.right) this.x += this.speed;
    if (this.up) this.y -= this.speed;
    if (this.down) this.y += this.speed;
    // 边界
    this.x < 0 ? this.x = 0 : 0;
    this.y < 0 ? this.y = 0 : 0;
    this.x > cvw - this.w ? this.x = cvw - this.w : 0;
    this.y > cvh - this.h ? this.y = cvh - this.h : 0;


    // 喷火
    if (this.left || this.right || this.up || this.down) {
        this.index = 0;
    }
    if (!this.left && !this.right && !this.up && !this.down) {
        this.index = 1;
    }
}