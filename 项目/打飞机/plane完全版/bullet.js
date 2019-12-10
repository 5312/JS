// 子弹相关

// 子弹类
function Bullet(x) {
    this.img = imgs[5];
    this.w = this.img.width;
    this.h = this.img.height;
    this.x = x;
    this.y = hero.y - this.h - 10;
    this.speed = 5;
}

// 移动方法
Bullet.prototype.move = function() {
    this.y -= this.speed;
}

// 绘制方法
Bullet.prototype.draw = function() {
    ctx.beginPath();
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
}

// 对外提供
// 创建子弹的方法
var bulletNum = 0;
var bulletSpe = 20;

function bullet_create() {
    bulletNum++;
    bulletSpe = fsBullet ? 7 : 20;
    if (bulletNum % bulletSpe == 0) {
        if (dbBullet) {
            // 双排
            bullets.push(new Bullet(hero.x));
            bullets.push(new Bullet(hero.x + hero.w - 6));
        } else {
            // 单排
            bullets.push(new Bullet(hero.x + hero.w / 2 - 3));
        }
    }
}

function bullet_draw() {
    bullet_create();
    for (var i = 0; i < bullets.length; i++) {
        var bullet = bullets[i];
        if (bullet.y < -bullet.h) {
            bullets.splice(i, 1);
            i--;
            continue;
        }
        bullet.move();
        bullet.draw();
    }
}