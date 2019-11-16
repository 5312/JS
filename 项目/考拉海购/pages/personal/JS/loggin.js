$(function() {

    $('input:password').css({
        marginTop: '10px',
        display: 'block'
    }).hide();
    $('.text_pass').click(function() {
        if ($('.text_pass').html() == '使用密码登录') {
            $('.text_pass').html('使用验证码登录')
        } else {
            $('.text_pass').html('使用密码登录')
        }

        $('input:password').toggle();
    })
    $('#loggin').click(function() {
        $('.botton').text('注册')
    })
    $('.botton').click(function() {
        // 登录
        if ($(this).text() == '登录') {
            console.log($(this).text())
        } else { //注册

        }
    })
})