<?php

// array和object都是引用类型，不能直接使用echo 或者 print输出

// 数组的使用及操作方法
// 1. 字面量创建
$arr1 = [1,2,3,4,5];
// 2. 通过array（）方法创建数组
$arr2 = array(1,2,3,4,5);
// 3. 通过下标创建数组
$arr3[0] = 1;
var_dump($arr3);
echo "<hr>"

// 根据数组索引不同，数组分为索引数组，关联数组
// $arr = [1,2,3,4,5];
// 遍历索引数组，直接使用for 循环遍历
$colors = array('red'=>'红'，'orange'=>'橙','yellow'=>'黄');
var_dump($colors);
echo $colors['cyan'];
// echo colors['cyan'];
// 遍历关联数组需要使用foreach循环
/**
*foreach循环语法
*foreach($arr as $key=>$value){
*}
**/
foreach($colors as $key=>$value){
    echo "{$key}=>{$value} <hr>";

}

// 数组的操作方法
// count()
echo count($colors);

// 添加 ： arr_push()
array_push($colors,'黑');
var dump =
var_dump ()

// array_splice(): 对数组进行添加修改。删除
// 会对数组的数字索引重置
array_splice($colors,i);
var_dump($colors);

// array_reverse($colors);
// 对数组内容反转，不会影响原数组

// 数组拼接
$d = array_merae($colors,$c);
var_dump($d);

// 数组截取
$e = array_slice($colors,3,2);
// 判断数组中是否包含某元素
in_array('红',$colors);

var_dump($e);

// 数组转字符串
$str = implode($colors,'-');

$a = 20;//使用 globals 使用全局变量
function a(){
    globals $a;
    $a = 30;
}
//函数相关
// 1. 函数名不区分大小写，不能重复声明名字相同的函数
// 2. 全局作用域声明的的变量想在局部作用域下使用，必须要先在局部作用域中用关键global修饰，然后在使用
 ?>
