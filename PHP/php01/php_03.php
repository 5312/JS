<?php
 // 字符串及字符串操作方法
 // 依然可以使用“” 或‘’表示字符串，同类型引用号不能嵌套。不同地方在于，PHP中的“” 可以解析变量
 $name = '小王';
 $age = 20;
 // echo '我的名字叫做：''.$name.'
 // 定界符声明字符串
 $str = <<< EEE
    你好，
    我是小王
EEE;
echo $str;

// 1. 读取字符串长度  PHP中字符串长度的对汉字的处理，每个字符串占3个长度
$str = 'hello world';
$str = '你好 世界';
$len = strlen($str);
echo $len;

// 2. 字符串截取



var_dump()

strlen($str);//返回字符串长度 mb_strlen($str) 可以返回中文字符长度；

strtolower($str);//字母转小写
strtoupper($str);//字母转大写

ucwords($str);//每一个单词的首字母转大写
ucfirst($str);//首字母转大写

str_replace('a','b',$str);//b替换$str 中的 a 区分大小写 ;
str_ireplace('a','b',$str);//替换 不区分大小写

htmlspecialchars($str,ENT_NOQUOTES);
//字符串转换为html 实体 ENT_COMPT(默认只编译双引号)ENT_QUOTES单引号双引号都编译,ENT_NOQUOTES不编译任何引号

trim($str);//删除字符串前后（左右）空格
ltrim($str);//只删除字符串左侧的空格
rtrim($str);//只删除字符串右侧的空格
//trim加第二个参数 就是移除指定的字符集 如ltrim($str,'0..9') 移除左侧数字开头的字符



strrpos($str,'a'); //字符串a 在$str 最后一次出现的位置 索引0开始 没有出现返回false 区分大小写
strripos($str,'a');//同上 但是不区分大小写

substr($str,0,3);//截取字符串 $str 的第一个字符 截取长度3 长度不填默认截取到最后  参数为负数则倒数
strstr($str,'a');//截取字符串 $str 中的第一个字符'a'后的字符串 如 sabc -> abc
strrchr($str,'a');//截取字符串 $str 中最后一一个字符'a'后的字符串
strrev($str);//字符串反转 abcd->dcba
md5($str);//字符串MD5加密

str_shuffle($str);//随机打乱字符串顺序

explode('-',$str);//指定分隔符分割字符串 返回数组 ‘-’ 分割$str

implode('-',$str);//数组拼接字符串 与explode()相反
 ?>
