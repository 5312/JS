// 对图片资源进行预先加载，以及全局变量的声明

// 获取画布对象
var cv = document.querySelector('#cv');
// 获取画笔
var ctx = cv.getContext('2d');
// 获得画布宽和高
var cvw = cv.width,
    cvh = cv.height;
// 控制游戏进程的定时器
var timer = null;
// 英雄变量
var hero = null;
// 背景变量
var bg = null;
// 存放所有敌机的数组
var enemys = [];
// 存放所有子弹的数组
var bullets = [];
// 存放所有物资的数组
var props = [];
// 存放所有炸弹的数组
var bombs = [];
// 记录得分的变量
var score = 0;
// 双子弹开关
var dbBullet = false;
// 双子单持续时间的定时器
var dbTimer = null;
// 快子弹开关
var fsBullet = false;
// 快子单持续时间的定时器
var fsTimer = null;

// 存放已经加载好资源的图片对象的数组
var imgs = [];

// 图片的预加载
function preload(callback) {
    // 存放图片src的数组
    /*
    0：背景
    1：我方飞机
    2：敌方飞机（小）
    3：敌方飞机（中）
    4：敌方飞机（打）
    5：子弹
    6：物资
    7：炸弹
    */
    var imgSrc = ['./imgs/background.png', './imgs/herofly.png', './imgs/enemy1.png', './imgs/enemy2.png', './imgs/enemy3.png', './imgs/bullet.png', './imgs/prop.png', './imgs/bomb.png'];
    var count = 0;
    for (var i = 0; i < imgSrc.length; i++) {
        var img = new Image();
        imgs.push(img);
        img.onload = function() {
            count++;
            if (count == imgSrc.length) {
                // 资源加载完成
                callback();
            }
        }
        img.src = imgSrc[i];
    }
}

// 键盘事件
document.onkeydown = function(e) {
    var keyCode = e.keyCode;
    switch (keyCode) {
        case 37:
            // 左
            hero.left = true;
            break;
        case 38:
            // 上
            hero.up = true;
            break;
        case 39:
            // 右
            hero.right = true;
            break;
        case 40:
            // 下
            hero.down = true;
            break;
        case 32:
            // 炸弹
            if (bombs.length) {
                // 1.炸弹数量-1
                bombs.pop();
                // 2.计算得分
                for (var i = 0; i < enemys.length; i++) {
                    score += enemys[i].g;
                }
                // 3.清空敌机
                enemys = [];
            }
            break;
    }
}

document.onkeyup = function(e) {
    var keyCode = e.keyCode;
    switch (keyCode) {
        case 37:
            // 左
            hero.left = false;
            break;
        case 38:
            // 上
            hero.up = false;
            break;
        case 39:
            // 右
            hero.right = false;
            break;
        case 40:
            // 下
            hero.down = false;
            break;
    }
}

// 随机数函数
function rn(x, y) {
    return Math.round(Math.random() * (y - x)) + x;
}

// 碰撞监测函数
function crash(m, n) {
    var l1 = m.x,
        r1 = l1 + m.w,
        t1 = m.y,
        b1 = t1 + m.h;
    var l2 = n.x,
        r2 = l2 + n.w,
        t2 = n.y,
        b2 = t2 + n.h;

    if (l1 > r2 || r1 < l2 || t1 > b2 || b1 < t2) {
        return false;
    }
    return true;
}

// 游戏碰撞监测
function game_crash() {
    hero_prop();
    hero_enemy();
    bullet_enemy();
}

// 我方飞机和物资的碰撞
function hero_prop() {
    for (var i = 0; i < props.length; i++) {
        var prop = props[i];
        var type = prop.index;
        if (crash(hero, prop)) {
            // 判断物资类型
            switch (type) {
                case 0:
                    // 炸弹
                    var len = bombs.length;
                    if (len < 3) {
                        var bomb = new Bomb(len);
                        bombs.push(bomb);
                    }
                    break;
                case 1:
                    // 双子弹
                    dbBullet = true;
                    var dbTime = 7;
                    clearInterval(dbTimer);
                    dbTimer = setInterval(function() {
                        dbTime--;
                        if (dbTime == 0) {
                            clearInterval(dbTimer);
                            dbBullet = false;
                        }
                    }, 1000)
                    break;
                case 2:
                    // 子弹加速
                    fsBullet = true;
                    var fsTime = 7;
                    clearInterval(fsTimer);
                    fsTimer = setInterval(function() {
                        fsTime--;
                        if (fsTime == 0) {
                            clearInterval(fsTimer);
                            fsBullet = false;
                        }
                    }, 1000)
                    break;
            }
            // 物资消失
            props.splice(i, 1);
            i--;
        }
    }
}

// 我方飞机和敌机的碰撞
function hero_enemy() {
    for (var i = 0; i < enemys.length; i++) {
        var enemy = enemys[i];
        if (crash(hero, enemy)) {
            console.log(enemy);
            // 0.关闭游戏进程的定时器
            clearInterval(timer);
            // 1.计算得分
            score += enemy.g;
            bg.score();
            // 2.我方爆炸
            hero.die = true;
            var heroTimer = setInterval(function() {
                hero.index++;
                hero.draw();
                if (hero.index == 4) {
                    clearInterval(heroTimer);
                }
            }, 25)
            // 3.敌机爆炸
            var enemyTimer = setInterval(function() {
                // console.log(enemy);
                enemy.index++;
                enemy.draw();
                if (enemy.index == enemy.maxIndex) {
                    clearInterval(enemyTimer);
                }
            }, 25)
            break;
        }
    }
}

// 子弹和敌机的碰撞
function bullet_enemy() {
    for (var i = 0; i < bullets.length; i++) {
        var bullet = bullets[i];
        for (var j = 0; j < enemys.length; j++) {
            var enemy = enemys[j];
            if (crash(bullet, enemy)) {
                // 子弹消失
                bullets.splice(i, 1);
                i--;
                // 敌机掉血
                enemy.blood--;
                if (enemy.blood <= 0) {
                    enemy.die = true;
                }
                // enemy.index++;
                // if (enemy.index == enemy.maxIndex) {
                //     score += enemy.g;
                //     enemys.splice(j, 1);
                //     j--;
                // }
                break;
            }
        }
    }
}