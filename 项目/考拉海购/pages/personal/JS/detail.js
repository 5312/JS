$(function() {
    var ss = JSON.parse(sessionStorage.getItem('nowsign')).accs;
    var n = JSON.parse(localStorage.getItem(ss)).carnub;
    var ns = 0;
    for (var i = 0; i < n.length; i++) {
        ns += n[i][0];
    }
    $('.poinnub').text(ns);

    if (sessionStorage.getItem('nowsign')) {
        var now = JSON.parse(sessionStorage.getItem('nowsign'))
        var nowuser = now.user
        $('#sig').text(nowuser)
    }
    // 读取数据
    var minimgsrc = sessionStorage.getItem('shoplist');
    //src路径
    var srcs = '../index/' + JSON.parse(minimgsrc).src;
    $('#shod').hide();
    $('.rbox').hide();
    $('.minimg>img').attr('src', srcs);
    $('.minimg').mouseenter(function(q) {
        $("#shod").show();
        $('.rbox').show();
        var ex = q.clientX;
        var ey = q.clientY;
    }).mousemove(function(e) {

        var q = q || window.event
        var l = q.clientX - $('.minimg').offset().left - $('#shod').width() / 2;
        var t = q.clientY - $('.minimg').offset().top - $('#shod').height() / 2;
        // l = l + 'px';
        // t = t + 'px';
        var lmax = $('.minimg').width() - $('#shod').width();
        var tmax = $('.minimg').height() - $('#shod').height();
        l = l > lmax ? lmax : l;
        l = l < 0 ? 0 : l;
        t = t > tmax ? tmax : t;
        t = t < 0 ? 0 : t;
        $('#shod').css({
            top: t,
            left: l
        })
        // 移动比例
        var rlmax = $('.rbox>img').width() - $('.rbox').width();
        var rtmax = $('.rbox>img').height() - $('.rbox').height();
        // 比例
        var scaleX = -rlmax / lmax;
        var scaleY = -rtmax / tmax;
        $('.rbox>img').css({
            top: t * scaleX + 'px',
            left: l * scaleY + 'px'
        })

    })
    $('.minimg').mouseleave(function(e) {
        $('#shod').hide();
        $('.rbox').hide();
    })
    $('.rbox>img').attr('src', srcs);
    $('.ap').text(JSON.parse(minimgsrc).name);
    $('.sp').text(JSON.parse(minimgsrc).detail);
    $('.price').text(JSON.parse(minimgsrc).price);
    // 购物车数量


    // 加入购物车
    $('.joincar').click(function() {
        var thisuser = JSON.parse(sessionStorage.getItem('nowsign'));
        var thisjoin = thisuser.carnub;
        // push本次 数量和id
        var nowpush = [thisjoin[thisjoin.length - 1][0] * 1 + 1, JSON.parse(minimgsrc).id];
        thisuser.carnub.push(nowpush);
        // id只添加一次
        if (thisuser.carnub[carnub.length - 1].length < 2) {
            thisuser.carnub[carnub.length - 1].push(JSON.parse(minimgsrc).id)
        }
        // localStorage.setItem(ss, JSON.stringify(thisuser));
        // sessionStorage.setItem('nowsign', JSON.stringify(thisuser))
        $('.poinnub').text(JSON.parse(localStorage.getItem(ss)).carnub[0][0]);
    })
})