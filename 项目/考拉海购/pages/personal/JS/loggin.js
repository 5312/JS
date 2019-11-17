$(function() {
    var isok1,
        isok2,
        isok3;
    $('input:password').css({
        marginTop: '10px',
        display: 'block'
    })
    $('.text_hi').hide();
    $('.name').hide();
    $('.text_pass').click(function() {
        // 验证码登录
        if ($('.text_pass').html() == '使用密码登录') {
            $('.text_pass').html('使用验证码登录')

        } else { //用户名登录
            $('.text_pass').html('使用密码登录')
        }
    })
    // 注册切换
    $('#loggin').click(function() {
        if ($(this).text() == '手机快捷注册') {
            $(this).text('已注册，登录')
            $('.botton').text('注册')
            $('.name').show();
        } else {
            $(this).text('手机快捷注册');
            $('.name').hide();
            $('.botton').text('登录')
        }
    })
    // 格式判断
    // 用户名
    $('.name').on('input', function() {
        var strt = $(this).val();
        var reg = /^([a-zA-Z0-9_]|[\u4e00-\u9fa5]){3,16}$/;
        if (reg.test(strt)) {
            $('.error1').css({
                color: 'green'
            }).text('用户名格式正确');
            isok1 = true;
        } else {
            $('.error1').css({
                color: 'red'
            }).text('用户名格式错误');
            isok1 = false;
        }
    })
    // 手机号
    $('.num').on('input', function() {
        var strt = $(this).val();
        var reg = /^(13|14|15|17|18)[0-9]{9}/;
        if (reg.test(strt)) {
            $('.error1').css({
                color: 'green'
            }).text('手机号格式正确');
            isok2 = true;
        } else {
            $('.error1').css({
                color: 'red'
            }).text('手机号格式错误');
            isok2 = false;
        }
    })
    //密码
    $('.mi').on('input', function() {
        //输入的内容
        var str = $(this).val();
        //长度6-16位
        var reg = /^((\d){6,16}|([a-zA-Z]){6,16})$/;
        //正则匹
        var bool = reg.test(str);
        //数字字母
        var regA = /^[A-Za-z0-9]{6,16}$/;
        var boolA = regA.test(str);
        //
        var re_g = /^\w{6,16}$/;
        var boo_l = re_g.test(str);
        if (bool) {
            $('.q1').css({
                backgroundColor: 'red'
            })
            isok1 = true;
        } else if (boolA) {
            $('.q2').css({
                backgroundColor: 'yellow'
            });
            $('.q1').css({
                backgroundColor: 'red'
            })
            isok2 = true;
        } else if (boo_l) {
            $('.q3').css({
                backgroundColor: 'green'
            })
            $('.q1').css({
                backgroundColor: 'red'
            })
            isok3 = true;
        } else {
            $('.q1,.q2,.q3').css({
                backgroundColor: 'white'
            });
            isok3 = true;
        }
    })
    // 按钮
    $('.botton').click(function() {
        console.log(isok1, isok2, isok3)
        // 登录
        if ($(this).text() == '登录') {
            var uname = $('.num').val();
            var mi = $('.mi').val();

            if (localStorage.getItem(uname)) {
                var detail = localStorage.getItem(uname);
                var json = JSON.parse(detail);
                if (json.password == mi) {
                    sessionStorage.setItem('nowsign', detail)
                    window.open('/home/ivan/Documents/JS/项目/考拉海购/pages/index/index.html', '_self');

                } else {
                    alert('密码错误')
                }
            } else {
                alert('未注册')
            }
        } else if (isok1 && isok2 && isok3) {

            //注册
            var privacy = {};
            var user = $('.name').val();
            var acc = $('.num').val();
            var pass = $('.mi').val();
            if (localStorage.getItem(acc)) {
                alert('已注册，请不要重复注册哦');
                return;
            }
            // privacy.push({});
            privacy.user = user;
            privacy.accs = acc;
            privacy.password = pass;
            privacy.carnub = [
                ['0', '']
            ];

            localStorage.setItem(acc, JSON.stringify(privacy))
            alert('注册成功')
        }

    })
})