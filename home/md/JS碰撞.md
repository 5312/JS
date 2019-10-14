###JS碰撞
预定义 id
> 通过元素的ID 属性 读写 元素的id属性值;  

    this.id = 'active';  
> 通过元素的className 属性 读写 元素的class属性值 
  
    this.className = 'active';  

> 图片未加载时获取不到
获取元素宽和高

    元素的offsetWidth & offsetHeight 可以获取元素的宽和高.
    获取的是元素和模型的宽和高.(有border+padding+content)

    元素的clientWidth & clientHeight 可以获取元素的宽和高(padding+content)

    元素的 offsetLeft & offsetTop 可以获取元素的偏移量

> (或取的是当前元素的左边缘与父元素内容区域的左边缘间的距离,
负数表示元素向左移动了,如果是正数表示向右移动/下移动) 

>     注意上面三队属性是只读属性,只可以获取值不可以赋值.

```javascript
//暴力关闭定时器
    var timer = setInterval(function(){
        for(var i = 1; i<= timer;i++){
            clearInterval(timer);
        }
        },1)
```
g