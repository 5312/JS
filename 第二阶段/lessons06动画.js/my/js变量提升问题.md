##js多维数组,函数变量提升问题  

错误代码
```javascripot
var fontArr = ['黑', '蓝', '黄', '红', '绿'],
    arrColors = ['blue', 'red', 'yellow', 'green', 'black'];
  
//输出大字
bagColor.innerText = fontArr[random(0,4)];

//输出小字
for (var i = 0; i < colors.length; i++) {
    var t = dele[i];  ///报错点  
    colors[i].innerText = fontArr[t];
}

// 随机数
function random(min,max) {
    return Math.round(Math.random() * (max-min) + min);
}
//不重复数字
function rnArr() {
    var arr = [];
    // 去重
    // 数组长度小于5时
    while (arr.length < 5) {
        // 生成0-4的随机数作为数组下标
        var n = random(0, 4);
        // 生成对应下标的数字在之前数组中不存在，push
        if (arr.indexOf(n) == -1) {
            arr.push(n);
        }

    }
     return arr;
}
  var dele =  rnArr();  ///问题点  变量未声明至调用之前
console.log(dele[2]);
```