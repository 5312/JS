// 敌方飞机相关

// 敌机类
function Enemy(img, w, speed, g, blood) {
    this.img = img;//图片对象
    this.w = this.img.width / w;
    this.h = this.img.height;
    this.x = rn(0, cvw - this.w);
    this.y = 0 - this.h - 50;
    this.index = 0;//截取绘制的下标
    this.speed = speed;//飞机的速度
    this.g = g;
    this.die = false;
    this.maxIndex = w - 1;
    this.blood = blood;
}

// 移动方法
Enemy.prototype.move = function () {
    if (this.die) {
        return;
    }
    this.y += this.speed;
}

// 绘制方法
Enemy.prototype.draw = function () {
    ctx.beginPath();
    ctx.drawImage(this.img, this.w * this.index, 0, this.w, this.h, this.x, this.y, this.w, this.h);
}

// 对外提供的
// 创建敌方飞机的方法
var enemyNum = 0;
function enemy_create() {
    // 判断是否应该创建
    if (rn(1, 100) > 70) {
        enemyNum++;
    }
    if (enemyNum > 12) {
        enemyNum = 0;
        // 开始创建
        var type = rn(1, 100);
        if (type <= 60) {//小飞机
            var enemy = new Enemy(imgs[2], 5, rn(1, 7), 10, 1);
        } else if (type <= 90) {//中飞机
            var enemy = new Enemy(imgs[3], 6, rn(1, 4), 50, 4);
        } else {//大飞机
            var enemy = new Enemy(imgs[4], 10, rn(1, 2), 100, 8);
        }
        enemys.push(enemy);
    }
}

// 绘制方法
function enemy_draw() {
    enemy_create();
    // 绘制
    for (var i = 0; i < enemys.length; i++) {
        var enemy = enemys[i];
        // 超出范围删除
        if (enemy.y > cvh) {
            enemys.splice(i, 1);
            i--;
            continue;
        }
        // 死亡爆炸
        if (enemy.die) {
            enemy.index++;
            if (enemy.index > enemy.maxIndex) {
                enemys.splice(i, 1);
                i--;
                continue;
            }
        }
        // 移动
        enemy.move();
        // 绘制
        enemy.draw();
    }
}