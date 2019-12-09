// 物资相关

// 物资类
function Prop() {
    this.img = imgs[6];
    this.w = this.img.width / 3;
    this.h = this.img.height;
    this.index = rn(0, 2);
    this.x = rn(0, cvw - this.w);
    this.y = 0 - this.h - 50;
    this.speed = rn(1, 15);
}

// 移动方法
Prop.prototype.move = function() {
    this.y += this.speed;
}
// 绘制方法
Prop.prototype.draw = function() {
    ctx.beginPath();
    ctx.drawImage(this.img, this.w * this.index, 0, this.w, this.h, this.x, this.y, this.w, this.h);
}

// 对外
var propNum = 0;

function prop_create() {
    if (rn(1, 100) > 90) {
        propNum++;
        if (propNum % 10 == 0 && propNum > 1) {
            var prop = new Prop();
            props.push(prop);
        }
    }
}

function prop_draw() {
    prop_create();
    for (var i = 0; i < props.length; i++) {
        var prop = props[i];
        if (prop.y > cvh) {
            props.splice(i, 1);
            i--;
            continue;
        }
        prop.move();
        prop.draw();
    }
}