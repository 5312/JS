$(function() {
    // 读取数据
    var minimgsrc = sessionStorage.getItem('shoplist');
    //src路径
    var srcs = '../index/' + JSON.parse(minimgsrc).src
    $('.minimg>img').attr('src', srcs);
    $('.minimg').on('mouseover', function() {

    })
})