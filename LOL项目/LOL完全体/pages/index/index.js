var carousel = document.getElementById('carousel'),

    imgW = document.getElementById('imw'),

    btn = document.getElementsByClassName('bt'),

    shadow = document.getElementById('shadow');

var w = imgW.offsetWidth,
    shaw = shadow.offsetWidth,
    max = w * 5,
    max2 = shaw * 4;
var timer = null;

timer = setInterval(next, 2000)

function next() {
    var s = carousel.offsetLeft - w,
        sshaw = shadow.offsetLeft + shaw;

    carousel.style.transition = '.5s';
    shadow.style.transition = '.5s';
    // carousel.style.left = s +'px';
    if (s < -max) {
        s = 0;
        sshaw = 0;
    }
    carousel.style.left = s + 'px';
    //选中状态切换
    shadow.style.left = sshaw + 'px';
     if (carousel.offsetLeft == -max) {
        shadow.style.left = 0 + 'px';
     }
    setTimeout(function() {
        if (carousel.offsetLeft == -max) {
            carousel.style.transition = 'none';
            carousel.style.left = 0 + 'px';
            shadow.style.transition = 'none';
            shadow.style.left = 0 + 'px';
        }
    }, 1000)

}
for (var i = 0; i < btn.length; i++) {
    (function(i) {
        btn[i].onclick = function() {
            carousel.style.left = (-w * i) + 'px';
            shadow.style.left = (shaw * i) + 'px';
            clearInterval(timer);
            timer = setInterval(next, 2000);
        }
    })(i)

}

//英雄资料
var jobBtn = document.getElementsByClassName('job');
var dis = document.getElementsByClassName('swiper-slide');

for (var i = 0; i < jobBtn.length; i++) {
    (function(i) {
        jobBtn[i].onclick = function() {

            for (var j = 0; j < dis.length; j++) {
                dis[j].style.display = 'none';
                jobBtn[j].style.color = '#676767';
            }

            dis[i].style.display = 'block';
            jobBtn[i].style.color = '#1da6ba';
        }
    })(i)
}