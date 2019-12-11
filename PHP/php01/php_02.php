<?php
// 1. 分支语句语法规则上和js的一模一样
// 存在3个变量。a，b，c。分别为10，20，30 ，经过代码运算，找出三个变量中的最小值
$a =10;
$b=20;
$c =30;
// for ($i=0; $i <3 ; $i++) {
    // code...
    // if($a>$b){
    //     if($b>$c){
    //         echo $c;
    //     }else{
    //         echo $b;
    //     }
    // }else{
    //     if($a>$c){
    //         echo $c;
    //     }else{
    //         echo $a;
    //     }
    // }
// }
$a = 5000;
$b = 0;
// 循环语句：同js
for ($i=1; $i <$a; $i++) {
    // code...
    $b += $i;
    if($b>$a){

        break;
    }
}
echo $i.'<hr>';
echo $b;
 ?>
