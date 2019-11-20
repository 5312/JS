$(function() {
    $('.si').click(function() {
        window.open('/home/ivan/Documents/JS/项目/考拉海购/pages/personal/loggin.html', '_self')
    })
    if (sessionStorage.getItem('nowsign')) {
        var now = JSON.parse(sessionStorage.getItem('nowsign')).user
        $('.si').text(now)
    }
    var imgsrc = sessionStorage.getItem('nowsign');
    var car = JSON.parse(imgsrc).carnub;
    var ca = JSON.parse(imgsrc);

    for (var i = 0; i < car.length; i++) {
        $("<div class='car'><input class='i' type='checkbox'><div class='imgbox ' > <img src = '' ></div><div class ='det'></div><div class ='color'></div> <div class ='univalent'></div><div class ='cols'><div class ='col ji'>-</div> <div class ='col import'>1</div><div class ='col ja'>+</div></div><div class ='sum'> </div><div class ='operate'> <div class='dete'>删除</div><div>移入收藏夹</div></div></div>").appendTo($('.car_cen'));
        // console.log('../index/' + car[i].src)
        // $('.imgbox>img').attr('src', '../index/' + car[i].src)
    };
    // console.log(car)
    $('.dete').each(function(x, y) {
        $(y).click(function() {
            if (confirm('是否删除？')) {
                $(this).parent().parent().remove();
                ca.carnub.splice(x, 1);
                sessionStorage.setItem('nowsign', JSON.stringify(ca))
            }
        })
    })
    $('.da').click(function() {
        window.open('../index/index.html', '_self')
    })
    $('.imgbox>img').each(function(x, y) {
        $(y).attr('src', '../index/' + car[x].src);
    })
    $('.det').each(function(x, y) {
        $(y).text(car[x].detail);
    })
    $('.univalent').each(function(x, y) {
        $(y).text(car[x].price);
    })
    $('.import').each(function(x, y) {
        $(y).text(car[x].num);
    })
    $('.sum').each(function(x, y) {
        var ys = $(y).siblings('.cols').children('.import').text();
        var sy = $(y).siblings('.univalent').text();
        $(y).text(ys * sy)
    })
    var min = JSON.parse(sessionStorage.getItem('nowsign'))
    $('.ji').each(function(x, y) {

        $(y).click(function() {
            var min = JSON.parse(sessionStorage.getItem('nowsign'))
            var i = min.carnub[x].num;
            i--;
            i = i < 1 ? 1 : i;
            var th = min.carnub[x];
            th.num = i;
            console.log(i);
            $(this).next().text(i);
            sessionStorage.setItem('nowsign', JSON.stringify(min));
            $('.sum').each(function(x, y) {
                var ys = $(y).siblings('.cols').children('.import').text();
                var sy = $(y).siblings('.univalent').text();
                $(y).text(ys * sy)
            })
        })
    })

    $('.ja').each(function(x, y) {
        $(y).click(function() {
            var min = JSON.parse(sessionStorage.getItem('nowsign'))
            var i = min.carnub[x].num;
            i++;
            $(this).prev().text(i);
            var th = min.carnub[x];
            th.num = i;
            sessionStorage.setItem('nowsign', JSON.stringify(min));
            $('.sum').each(function(x, y) {
                var ys = $(y).siblings('.cols').children('.import').text();
                var sy = $(y).siblings('.univalent').text();
                $(y).text(ys * sy)
            })
        })
    })
    $('#all').click(function() {
        if ($('#all').prop('checked')) {
            $('.car>.i').prop('checked', true)
            // 总额计算
            var rest = [];
            $('.sum').each(function(x, y) {
                rest.push($(y).text())
            })
            sum(rest);
            $('.am').text(sum(rest))
        } else {
            $('.car>.i').prop('checked', false)
            $('.am').text(0)
        }
    })
    $('.i').each(function(x, y) {
        $(y).click(function() {
            if ($(this).prop('checked')) {
                $(this).prop('checked', true);
                // 总额计算
                var rests = $(this).siblings('.sum').text();
                var yuan = $('.am').text();
                $('.am').text(rests * 1)
            } else {
                $(this).prop('checked', false);
                $('.am').text(0)
            }
        })
    })
})

function sum(arr) {
    return eval(arr.join("+"));
};