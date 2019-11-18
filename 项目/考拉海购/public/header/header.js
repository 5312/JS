$(function() {

    $('.si').click(function() {
        window.open('/home/ivan/Documents/JS/项目/考拉海购/pages/personal/loggin.html', '_self')
    })
    if (sessionStorage.getItem('nowsign')) {
        var now = JSON.parse(sessionStorage.getItem('nowsign')).user
        $('.si').text(now)
    }
})