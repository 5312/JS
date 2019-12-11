$(function() {

    $('.si').click(function() {
        window.open('/home/ivan/Documents/JS/项目/考拉海购/pages/personal/loggin.html', '_self')
    })
    if (sessionStorage.getItem('nowsign')) {
        var now = JSON.parse(sessionStorage.getItem('nowsign')).user
        $('.si').text(now)
    }
    //注意：导航 依赖 element 模块，否则无法进行功能性操作
    layui.use('element', function() {
        var element = layui.element;

        //…
    });
})