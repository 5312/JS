##DOM :document  object model 文档对象模型   

    作用在浏览器加载文档时,将文档内容转换成js对象 ,实现js代码对文档内容的操作 (增删改查),
    DOM 其实就是浏览器提供的对文档内容操作的接口.     

>DOM树:   
文档内容转化后的对象结构像是一个树形结构,根对象就是document,document对象在文档加载到浏览器中
就已经存在,可以直接使用.    

>document根对象下有两个子对象,分别是:DOCTYPE 以及HTML   
DOM中的最小组成部分称为节点(Node),节点类型有很多,我们常见的有element元素节点以及text文本节点.    
html就是整个文档的根元素节点.  

####节点类型   
    nodeTYPE : 所有的节点都拥有的属性,返回值number,表示节点类型,1为元素节点,3为文本节点,   

####节点名称:   
    nodeName: 所有节点都拥有的属性,返回值string,表示节点名称,如果节点是元素节点,那么返回大写的标签名  

####节点的操作
---

#####获取节点 
html作为文档的根节点,下面只有两个子节点,分别是head和body   

    document.head获取head节点 

    document.body获取body节点

以上两个节点都是元素节点 

    document.documentElement获取html节点 

#####自定义节点的获取(父节点,子节点,同胞节点)
子节点的获取:childNodes: 返回的是一个数组NodeList 节点列表,里面存放了指定节点所有的子节点.


>大多数主流浏览器会将body中的换行,空格,缩进处理为文本节点,所以通过childNode获取指定节点的所有子节点是要注意包含文本节点的  

---------

**获取第一个子节点**   

    firstChild

**获取最后一个子节点**  

    lastChild
    console.log(cs[1].lastChild);

######父节点获取.一个元素节点的父节点不可能是一个文本节点,只能是元素节点.   

    parentNode
    console.log(document.body.parentNode)
    p.parentNode.childNodes[5].childNodes[5].innerHTML = '找到你了';

**同胞关系**  

    nextSibling:       获取指定节点的后一个同胞节点
    perviousSibling:   获取指定节点的前一个同胞节点 

**元素节点的获取**  

>子元素节点:children,只会获取指定节点的所有元素子节点,没有任何兼容问题,推荐指数5颗星   

    console.log(document.body.children)  

>父元素节点 : parentElement  存在兼容问题,IE678不支持  

    console.log(p.parentElement);

######同胞元素节点:  

    nextElementSibling: 获取指定节点的下一个元素同胞节点
    previousElementSibling:获取指定节点的上一个元素同胞节点 
    console.log(p.nextElementSibling);
>如果不存在指定关系的元素节点,那么会返回null


######存在兼容问题   

    firstElementChild:             获取指定节点的第一个元素子节点.
    lastElementChild:              获取指定节点的最后一个元素子节点. 
    document.getElementsByName();  获取带有指定name属性值的元素集合.更多用于获取表单元素.

    document.querySelector , document.querSelectorAll: 

    需要参数是css选择器字符串,大多数css选择器都支持,但是不支持伪元素和伪类的查找.
    console.log(document.querySelector('.s'));

#####document.getxxx 与 document.queryxxx  的区别
1. get类型的需要的参数是具体值,而query类型的要的是选择器字符串
2. get类型的没有兼容问题,而query类型的存在兼容问题,IE9以下不支持.
3. get类型的得到的是动态的元素集合,而query类型的得到的是静态类型的元素集合.

**get类型的和query类型的不仅仅只可以用于document,也可以用于元素节点,但是查找获取的范围就是在当前元素节点范围内**  

    body.querySelectorAll('span')查找获取的是文档中饭所有的span标签
    div.querySelectorAll('span') 查找获取的是div中所有的span标签  



**对节点的其他操作**         
创建元素节点 

    document.createElement(): 参数 是 tagName字符串
    var d = document.createElement('div');
    console.log(d);

#####判断一个标签节点是否存在子节点.
1. children.length > 0  
2. childNode.length > 0
3. firstChild == null
4. lastChild == null
5. hasChildNodes() 返回值是 boolean.如果存在子节点返回true否则返回false.

#####2. 向指定节点元素中添加子元素  

    appenChild():向指定元素的末尾添加子元素
    document.body.appenChild(d);

#####3. 删除指定元素中的子元素  

    removeChild():
    document.body.removeChild();
    remove(): 将指定元素从它的父元素中删除

    4. replaceWith
    5. replaceChild():在指定父元素中去替换子元素的位置,被替换的子元素会从父元素中删除.
```javascript
/*
 node1.replaceChild(node2,node3);
 node1:表示node2和node3的父节点.
 node2:表示要替换的节点.
 node3:表示被替换的节点.

 node1.replaceWith(node2);
 表示用node2区替换node1,node1会被从文档中删除.
 */
```

```
var ul = document.querySelector('ul');
var l1 = ul.firstElementChild;
var l6 = document.createElement('li');
ul.appenChild(l6);
l6.innerHTML = 6;
 
ul.replaceWith(l1,16);
 l1.replaceWith(l6)
```

**6. cloneNode:对节点进行克隆**   
>存在1个参数boolean,如果true表示深克隆,会将指定节点以及节点的子节点都进行克隆:如果false表示
//浅克隆,只会克隆指定节点,节点的子节点不会被克隆.

```
var newUl1 = document.body.firstElementChild.cloneNode(false);
console.log(newUl1);
document.body.appenChild(newUl1);
```

**DOM的属性操作**   
 1. id  
 2. className  
 3. offsetWidth , offawtHeight  
 4. offsetLeft  , offsetTop    
 5. clientWidth , clientHeight    
 6. innerHTML   , innerText  ,  outerHTML   
 7. getAttribute / setAttribute / hasAttribute / removeAttribute
> style,id , class ,title,src , alt ,name ,type 等等都是元素的自有属性

#####我们会在一些情况下为元素添加自定义属性    
    1. getAttribute():用来读取元素的属性值,包含自有属性和自定义属性  
    console.log(wrap.love);
    console.log(wrap.getAttribute('love'));

    2. setAttribute():用来设置元素的属性值,包含自有属性和自定义属性   
     wrap.setAttribute('like','box');
     console.log(wrap.like);
     console.log(wrap.getAttribute('like'));

    3. hasAttribute():用来判断元素的某个属性是否有值,如果有返回true,没有则返回flase;
     console.log(wrap.hasAttribute('love'));

    4. removeAttribute():用来删除为元素添加的自定义属性或自由属性的值
     wrap.removeAttribute('love');
     console.log(wrap.love);
     console.log(wrap.getAttribute('love'));

    5. getComputedStyle():获取计算后样式(在元素上最终体现的样式)
     var styleObj = window.getComputedStyle(wrap);
     console.log(styleObj);

>IE上没有getComputeStyle,但是IE提供了currenStyle  
 
    wrap.currentStyle.dispaly;




