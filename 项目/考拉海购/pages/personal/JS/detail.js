$(function() {
    if (sessionStorage.getItem('nowsign')) {
        var ss = JSON.parse(sessionStorage.getItem('nowsign')).accs;
        var n = JSON.parse(sessionStorage.getItem('nowsign')).carnub;
        var ns = 0;
        for (var i = 0; i < n.length; i++) {
            ns += n[i].num * 1;
        }
    }
    // 购物车数量
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
    // 数量加减
    $('.j').click(function() {
        var v = $('.ival').val();
        v--;
        v = v < 1 ? 1 : v;
        $('.ival').val(v)

    });
    $('.a').click(function() {
        var v = $('.ival').val();
        v++;
        $('.ival').val(v)
    });
    // console.log(us(JSON.parse(minimgsrc).id, 'nowsign'));

    // 加入购物车
    $('.shopcar').click(function() {
        window.open('./shopcar.html', '_self')
    })
    $('.joincar').click(function() {
        if (!sessionStorage.getItem('nowsign')) {
            alert('未登录')
            return
        }
        // 现在登录的用户信息
        var thisuser = JSON.parse(sessionStorage.getItem('nowsign'));
        var thisjoin = thisuser.carnub;
        // 第一次添加
        if (!thisjoin[0]) {
            thisjoin.push({
                num: $('.ival').val(),
                id: JSON.parse(minimgsrc).id,
                src: JSON.parse(minimgsrc).src,
                detail: JSON.parse(minimgsrc).detail,
                price: JSON.parse(minimgsrc).price

            })
        } else {
            // 判断购物车里面有没有这个商品
            var tf = us(JSON.parse(minimgsrc).id, 'nowsign');
            if (tf) {
                if (tf[0]) {
                    // 本次商品下标
                    var n1 = us(JSON.parse(minimgsrc).id, 'nowsign')[1];

                    var n2 = thisjoin[n1].num * 1;
                    // n2 += 1;
                    n2 += $('.ival').val() * 1;
                    //
                    // $('.ival').val(n2)
                    thisjoin[n1].num = n2;

                } else {
                    thisjoin.push({
                        num: $('.ival').val(),
                        id: JSON.parse(minimgsrc).id,
                        src: JSON.parse(minimgsrc).src,
                        detail: JSON.parse(minimgsrc).detail,
                        price: JSON.parse(minimgsrc).price
                    })
                }
            } else {
                // console.log(tf)
                thisjoin.push({
                    num: $('.ival').val(),
                    id: JSON.parse(minimgsrc).id,
                    src: JSON.parse(minimgsrc).src,
                    detail: JSON.parse(minimgsrc).detail,
                    price: JSON.parse(minimgsrc).price
                })
            }
        }
        // thisuser.carnub = [];
        sessionStorage.setItem('nowsign', JSON.stringify(thisuser));
        poinnub()
    })

})

// 去重
function us(nowid, pushkey) {
    var us_this = JSON.parse(sessionStorage.getItem(pushkey));
    var usjoin = us_this.carnub;
    for (var i = 0; i < usjoin.length; i++) {
        if (usjoin[i].id == nowid) {
            var arr = ['true', i]
            return arr;
        }
    }
}
// 小车的改变函数
function poinnub() {
    // 小车的数字显示
    var ss = JSON.parse(sessionStorage.getItem('nowsign')).accs;
    var n = JSON.parse(sessionStorage.getItem('nowsign')).carnub;
    var ns = 0;
    for (var i = 0; i < n.length; i++) {
        ns += n[i].num * 1;
    }
    // 购物车数量
    $('.poinnub').text(ns);
}