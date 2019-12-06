// 业务
// 地图类
function Smap(size) {
    this.size = size;//地图上每一个格子的宽高（也表示蛇头及每一节身体的宽高）
    this.foods = [];//存放地图上的食物
    this.color = 250;//控制地图颜色，与食物逐渐相近
}
Smap.prototype.init = function () {//游戏初始化
    ctx.beginPath();
    ctx.font = '70px 宋体';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('按下 空格键 开始游戏', cv.width / 2, cv.height / 2);
}
Smap.prototype.draw = function () {//绘制地图的方法
    /*
    var vnum = cv.height / this.size;//列数
    var hnum = cv.width / this.size;//行数
    // 绘制行
    for (var i = 0; i <= vnum; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * this.size);
        ctx.lineTo(cv.width, i * this.size);
        ctx.stroke();
    }
    // 绘制列
    for (var i = 0; i <= hnum; i++) {
        ctx.beginPath();
        ctx.moveTo(i * this.size, 0);
        ctx.lineTo(i * this.size, cv.height);
        ctx.stroke();
    }
    */
    // cv.style.backgroundColor = 'rgb(0,'+this.color+',0)';
}
Smap.prototype.createFood = function () {//地图上添加食物的方法
    // 创建食物
    var x = rn(0, cv.width / this.size - 1) * this.size;
    var y = rn(0, cv.height / this.size - 1) * this.size;
    var food = new Food(x, y);

    // 判断食物位置
    //如果食物出生在蛇身或者蛇头那么重新生成
    if (food.x == snake.x && food.y == snake.y) {
        return this.createFood();
    }
    for (var i = 0; i < snake.bodys.length; i++) {
        var s = snake.bodys[i];
        if (s.x == food.x && s.y == food.y) {
            return this.createFood();
        }
    }
    // 生成食物
    return food;
}
Smap.prototype.drawFood = function () {//绘制食物
    // 创建食物
    // 如果当前地图没有食物那么创建食物
    if (!this.foods.length) {
        this.foods.push(this.createFood());
    }
    // 绘制食物
    for (var i = 0; i < this.foods.length; i++) {
        this.foods[i].draw();
    }
}

//创建地图对象
var smap = new Smap(20);

// 蛇类
function Snake(x, y) {
    this.x = x;//x坐标
    this.y = y;//y坐标
    this.size = smap.size;//宽和高
    this.bodys = [];//蛇身体
    this.bodyl = 2;//蛇身体的长度
    this.hc = 'red';//蛇头颜色
    this.bc = 'yellow';//蛇身颜色
    this.speed = 500;//蛇的速度
}
Snake.prototype.dir = 39;//蛇运动方向
Snake.prototype.lock = false;//方向锁，防止快速按键导致蛇头反向。
Snake.prototype.drawHead = function () {//绘制蛇头的方法
    ctx.beginPath();
    ctx.fillStyle = this.hc;
    ctx.fillRect(this.x, this.y, this.size, this.size);
}
Snake.prototype.drawBody = function () {//绘制蛇身的方法
    for (var i = 0; i < this.bodys.length; i++) {
        var s = this.bodys[i];
        ctx.beginPath();
        ctx.fillStyle = this.bc;
        ctx.fillRect(s.x, s.y, this.size, this.size);
    }
    // 吃食物
    this.eat();
}
Snake.prototype.move = function () {//蛇头运动的方法
    // 存储蛇头当前的位置作为蛇身
    this.bodys.push(new Snake(this.x, this.y));
    if (this.bodys.length > this.bodyl) {//当超出长度时将距离蛇头最远的蛇身删除。
        this.bodys.shift();
    }
    // 蛇头运动
    switch (this.dir) {
        case 37:
            this.x -= this.size;//左
            break;
        case 38:
            this.y -= this.size;//上
            break;
        case 39:
            this.x += this.size;//右
            break;
        case 40:
            this.y += this.size;//下
            break;
    }
    // 蛇运动后将锁重新打开
    this.constructor.prototype.lock = false;
    // 边界
    if (this.x >= cv.width) this.x = 0;
    if (this.y >= cv.height) this.y = 0;
    if (this.x < 0) this.x = cv.width - this.size;
    if (this.y < 0) this.y = cv.height - this.size;
    // 判断死亡
    this.die();
}
Snake.prototype.eat = function () {//蛇吃食物的方法
    for (var i = 0; i < smap.foods.length; i++) {
        var food = smap.foods[i];
        if (this.x == food.x && this.y == food.y) {
            this.bodyl++;//长度+1
            smap.foods.splice(i, 1);//食物消失
            smap.color > 20 ? smap.color -= 10 : smap.color;//改变地图颜色
            this.speedUp();//蛇加速
            break;
        }
    }
}
Snake.prototype.die = function () {//蛇死亡的方法
    for (var i = 0; i < this.bodys.length; i++) {
        var sb = this.bodys[i];
        if (this.x == sb.x && this.y == sb.y) {
            // 蛇吃到自己，死亡
            over();
        }
    }
}
Snake.prototype.speedUp = function () {//蛇加速的方法
    // 规定蛇的身体每增加3个就加速一次
    if (this.bodys.length > 3 && this.bodys.length % 3 == 0) {
        this.speed *= 0.5;
        game(this.speed);
    }
}


// 食物类
function Food(x, y) {
    this.x = x;
    this.y = y;
    this.size = smap.size;
    this.c = 'rgb(0,10,0)';
}
Food.prototype.draw = function () {//食物绘制
    ctx.beginPath();
    ctx.fillStyle = this.c;
    ctx.fillRect(this.x, this.y, this.size, this.size);
}

// 键盘控制
document.onkeydown = function (e) {
    var kc = e.keyCode;
    // 当按下的是方向键并且方向锁打开才能改变方向
    if (kc > 36 && kc < 41 && !Snake.prototype.lock) {
        var dir = Snake.prototype.dir;
        if (dir == 37 && kc != 39) {
            Snake.prototype.dir = kc;
        }
        if (dir == 38 && kc != 40) {
            Snake.prototype.dir = kc;
        }
        if (dir == 39 && kc != 37) {
            Snake.prototype.dir = kc;
        }
        if (dir == 40 && kc != 38) {
            Snake.prototype.dir = kc;
        }
        // 将方向锁关闭。（一旦选择了方向，必须等待蛇在当前方向上移动后才能再次选择方向）
        Snake.prototype.lock = true;
    }
    if (kc == 32 && !timer) {
        game(snake.speed);
    }
}

// 随机函数
function rn(x, y) {
    return Math.round(Math.random() * (y - x)) + x;
}

// 游戏开始的函数
function game(speed) {//参数speed用于改变蛇的运动速度
    clearInterval(timer);//防止多开定时器
    timer = setInterval(function () {
        cv.width = cv.width;
        // 绘制地图
        smap.draw();
        // 绘制蛇
        snake.move();
        snake.drawBody();
        snake.drawHead();
        // 绘制食物
        smap.drawFood();
    }, speed)
}
// 游戏结束的方法
function over() {
    clearInterval(timer);
    timer = null;
    $('#cv').fadeOut(1000).delay(200).fadeIn(500);
    setTimeout(function () {
        cv.width = cv.width;
        ctx.beginPath();
        ctx.font = '100px 宋体';
        ctx.fillStyle = 'gold';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('游戏结束', cv.width / 2, cv.height / 2);
    }, 1000)
}