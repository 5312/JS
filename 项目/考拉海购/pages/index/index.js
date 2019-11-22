var iconsrc = ['img/icon1.png', 'img/icon2.png', 'icon3.png'];

// 瀑布流容器
var oul = $('<ul></ul>').appendTo($('.shop_main')).addClass('main_left');

// 图片对象
var date = [];
//

var arr = ['妈妈热捧的果泥', '舒肤佳', '巧克力', '书包', '皮包', '阿玛尼皮包', '优雅茶玫瑰 释放专属魅力', 'Dr.Ci:Labo城野医生 377 VC焕亮精华液 18g', '夜间修护睡眠面膜', '促进伤口愈合', 'KOSÉ 高丝 softymo 去黑头抑制黑色素亮白卸妆洁面乳 190克', 'SHANGPREE 香蒲丽 亮肤美颜收缩毛孔泡泡清洁面膜 5片', '【林允同款】VIVLAS 唯兰颂 茶秘水润愈颜面膜 5片装', 'Mellin', '美林', '钻戒', '食西梅泥', 'Decleor 思妍丽 2合1舒缓修复面膜 - 敏感肌肤适用 质地清爽不粘腻 50ml', '12瓶', 'Decleor 思妍丽 2合1舒缓修复面膜 - 敏感肌肤适用 质地清爽不粘腻 50ml', 'NIKE TANJUN (PS) 男童运动鞋 818382-011 黑色 28-35码', 'hirosophy樱花补水保湿弹力提拉紧致眼膜日本近铁百货进口 樱花新眼睛眼膜,补水保湿', 'JAYJUN 补水保湿三部曲水光面膜 10片装 当红热卖 ,三步奏响水嫩乐章', '【3件组合装 包邮包税】SNP 斯内普海洋燕窝+黑珍珠+竹炭面膜 3盒,深层补水 让肌肤喝饱水'];
//
dates();
// 加载图片
main();

function dates() {
    for (var i = 0; i < 30; i++) {
        date.push({})
        date[date.length - 1].src = './img/m_le' + i + '.jpg';
        date[date.length - 1].id = i < 10 ? '00' + i : '0' + i;
        date[date.length - 1].price = rn(29, 899);
        date[date.length - 1].name = arr[i];
        date[date.length - 1].detail = arr[i];
        // localStorage.setItem(date)
    }
    // console.log(date);
}
// 随机数
function rn(x, y) {
    return Math.floor(Math.random() * (y - x + 1) + x);
}

$(function() {
    //注意：导航 依赖 element 模块，否则无法进行功能性操作
    layui.use('element', function() {
        var element = layui.element;

        //…
    })
    // 用户中心
    $('.usercontent').click(function() {
        if (sessionStorage.getItem('nowsign')) {
            window,
            open('../personal/user.html', '_self')
        }
        else {
            alert('未登录')
        }
    })
    $('.changes').hide();
    // 修改密码
    $('.x').click(function() {
        if (sessionStorage.getItem('nowsign')) {
            $('.changes').show();
        } else {
            alert("请先登录")
        }
    })
    $('.clic').click(function() {
        var nse = JSON.parse(sessionStorage.getItem('nowsign')).accs;
        console.log(nse)
        var old = $('.old').val();
        var news = $('.news').val();
        // console.log(news)
        // if (localStorage.getItem(nse)) {
        var olds = JSON.parse(localStorage.getItem(nse));
        if (old == olds.password && news) {
            olds.password = news;
            localStorage.setItem(nse, JSON.stringify(olds));
            sessionStorage.setItem('nowsign', [])
            alert('修改成功,请重新登录')
            $('#sig').text('登录')
            // 修改密码框消失
            $('.changes').hide();
        } else {
            alert('密码错误')
        }
        // } else {
        //     alert('未注册')
        // }
    })
    // 注销
    $('.signout').click(function() {
        sessionStorage.setItem('nowsign', [])
        $('#sig').text('登录')
    })
    // 购物车
    $('.shopcar').click(function() {
        if (sessionStorage.getItem('nowsign')) {
            window.open('../personal/shopcar.html', '_self')
        } else {
            alert('请登录')
        }
    })
    // 跳转登录页面
    $('#sig').click(function() {
        window.open('../personal/loggin.html', '_self')
    })
    //
    if (sessionStorage.getItem('nowsign')) {
        var now = JSON.parse(sessionStorage.getItem('nowsign')).user
        $('#sig').text(now)
    }
    $('.menu>li').each(function(x, y) {
        $(y).css({
            backgroundImage: "url(img/iconw" + x + ".png)",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '13px 10px'
        })
    })

    var tow = 0;
    var scroll;
    window.onscroll = function() {
        // 可视窗
        var viewH = $(window).height();
        // 滚动条
        scroll = $(document).scrollTop();
        // 文档最低列
        var nowH = $(document.body).height();
        if ((viewH + scroll) >= (nowH) && tow < 2) {
            tow++;
            main();
        }
        // 回顶部定位
        var top = $('.shop_right').offset().top;
        if ((scroll) >= 740) {
            $('.shop_right').css({
                position: 'fixed',
                right: '89px'
            })
            $('.shop_left').css({
                position: 'fixed',
                left: '40px'
            })
        } else {
            $('.shop_right').css({
                position: 'absolute',
                top: '0px',
                right: '-85px'
            })
            $('.shop_left').css({
                position: 'absolute',
                top: '10px',
                left: '-85px'
            })
        }
        // 存入session
        $('.l-shop').each(function(x, y) {
            $(y).click(function() {
                sessionStorage.setItem('shoplist', JSON.stringify(date[x]));
                window.open('../personal/detail.html', '_self')
            })
        })
    }

    $('.rtop:eq(3)').click(function() {
        $('html').animate({
            scrollTop: 0
        })
    })
})
// 图片路径加载
function smain() {
    $('.l-shop>img').each(function(x, y) {
        $(y).attr('src', date[x].src);
    })
    $('.l-r>h1').each(function(x, y) {
        $(y).html(date[x].name)
    })
    $('.l-r >.price').each(function(x, y) {
        $(y).html(date[x].price);
    })
    $('.p').each(function(x, y) {
        $(y).html(date[x].detail)
    })
}
// 轮播layui
layui.use('carousel', function() {
    var carousel = layui.carousel;
    //建造实例
    carousel.render({
        elem: '#test1',
        width: '100%' //设置容器宽度
            ,
        arrow: 'hover' //始终显示箭头
            //,anim: 'updown' //切换动画方式
            ,
        height: '505px',
    });
});


function main() {
    for (var i = 1; i < 9; i++) {
        // 瀑布流
        var oli = oul.append("<li class='l-shop'><img src='./img/m_le1.jpg'><div class='l-r'><h1>妈妈热捧的果泥</h1><div class='p'>【滋润肠道】Mellin 美林 宝宝辅食西梅泥 100克/瓶 12瓶</div><div class='price c-r'>￥<span class='c-r'>95</span></div><div class='limit'><span class='c-r c-l'>限量1000件</span><div class='nowgrab'>立即抢购</div></div></div></li>");
    }
    smain();
}