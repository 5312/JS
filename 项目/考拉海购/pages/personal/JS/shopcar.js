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


    for (var i = 0; i < car.length; i++) {
        $("<div class='car'><input class='i' type='checkbox'><div class='imgbox ' > <img src = '' ></div><div class ='det'></div><div class ='color'></div> <div class ='univalent'></div><div class ='cols'><div class ='col'>-</div> <div class ='col import'>1</div><div class ='col'>+</div></div><div class ='sum'> </div><div class ='operate'> <div>删除</div><div>移入收藏夹</div></div></div>").appendTo($('.car_cen'));
        // console.log('../index/' + car[i].src)
        // $('.imgbox>img').attr('src', '../index/' + car[i].src)
    };
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
})