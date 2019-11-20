$(function() {
    // $('.addressed').hide();
    $('.username').hide()
    $('.na').css({
        color: 'red'
    }).click(function() {
        $(this).css({
            color: 'red'
        });
        $('.username').show();
        $('.us').text('我的昵称')
        $('.addressed').hide();
        $('.address').css({
            color: 'black'
        })
    })
    var isok = false;
    $('.chenge').on('input', function() {
        var regeX = /^[\u4e00-\u9fa5]{2,10}/;
        var te = $(this).val()
        console.log(regeX.test(te));
        if (regeX.test($(this).val())) {
            isok = true;
            $('.ui').text('格式正确').css({
                color: 'green'
            })
        } else {
            isok = false;
            $('.ui').text('格式错误').css({
                color: 'red'
            })
        }
    })
    $('.ok').click(function() {
        if (isok) {
            var uns = JSON.parse(sessionStorage.getItem('nowsign'))
            var orgin = JSON.parse(localStorage.getItem(uns.accs))
            orgin.user = $('.chenge').val();
            localStorage.setItem(uns.accs, JSON.stringify(orgin))
            uns.user = $('.chenge').val();
            sessionStorage.setItem('nowsign', JSON.stringify(uns))
            alert('设置成功')
        }
    })
    $('.address').click(function() {
        $(this).css({
            color: 'red'
        })
        // 点击地址昵称消失
        $('.username').hide();
        $('.us').text('我的收货地址')
        $('.addressed').show();
        $('.na').css({
            color: 'black'
        })

    })

    // 置空
    // var no = JSON.parse(sessionStorage.getItem('nowsign'));
    // var lono = JSON.parse(localStorage.getItem(no.accs));
    // lono.address = [];
    // localStorage.setItem(no.accs, JSON.stringify(lono))
    //
    //
    // 保存新地址
    olds();
    $('.save').click(function() {
        console.log(layall)

        // 当前登录

        var no = JSON.parse(sessionStorage.getItem('nowsign'));
        // 从local取
        var lono = JSON.parse(localStorage.getItem(no.accs));
        // 当有一项未填写时
        var addarr = {};
        $('.vall').each(function(x, y) {

            if (!$('.vall')[x].value || !layall) {
                var text = $('.vall')[x]
                var t1 = $(text).prev().text();
                alert('请填写' + t1)
            } else {
                // 所在地区
                addarr.Region = layall;
                // 详细地址
                addarr.Address = $('.vall')[0].value;
                // 收货人姓名
                addarr.consigneeName = $('.vall')[1].value;
                // 手机号码
                addarr.mobilePhoneNumber = $('.vall')[2].value;
                // 电话号码
                addarr.telephoneNumber = $('.vall')[3].value;
                //  邮箱
                addarr.postbox = $('.vall')[4].value;
            }
        })

        // 当全部输入时，保存地址信息
        if (Object.keys(addarr).length == 6) {
            // 不是第一次保存地址
            if (lono.address) {
                // 当地址不超过5次
                if (lono.address.length < 5) {
                    // 所在地区
                    addarr.Region = layall;
                    // 详细地址
                    addarr.Address = $('.vall')[0].value;
                    // 收货人姓名
                    addarr.consigneeName = $('.vall')[1].value;
                    // 手机号码
                    addarr.mobilePhoneNumber = $('.vall')[2].value;
                    // 电话号码
                    addarr.telephoneNumber = $('.vall')[3].value;
                    //  邮箱
                    addarr.postbox = $('.vall')[4].value;
                    // 添加
                    lono.address.push(addarr);
                    localStorage.setItem(no.accs, JSON.stringify(lono))
                }
            } else { // 第一次保存地址
                lono.address = [addarr];
                localStorage.setItem(no.accs, JSON.stringify(lono))
            }
        }
        // olds();
    })
    var layall;
    //配置插件目录
    layui.config({
        base: './layuiaddress/mods/',
        version: '1.0'
    });
    //一般直接写在一个js文件中
    layui.use(['layer', 'form', 'layarea'], function() {
        var layer = layui.layer,
            form = layui.form,
            layarea = layui.layarea;

        layarea.render({
            elem: '#area-picker',
            change: function(res) {
                //选择结果
                console.log(res);
                layall = res;
            }
        });
    });

})

function olds() {
    //  旧地址渲染
    var nows = JSON.parse(sessionStorage.getItem('nowsign'));
    var loca = JSON.parse(localStorage.getItem(nows.accs)).address;
    if (loca) {
        $.each(loca, function(x, y) {
            $('<div><span class="receive0">收货人</span><span class="receive1">收货地址</span ><span class="receive2">联系电话</span><span class="receive3"><span class="change">修改</span>|<span class="splice">删除</span></span></div>').appendTo($('.old'));
            // console.log(y)
            $('.receive0')[x].innerHTML = y.consigneeName;
            $('.receive1')[x].innerHTML = y.Address;
            $('.receive2')[x].innerHTML = y.mobilePhoneNumber;
        })
        $('.change').each(function(x, y) {
            // 点击修改时资料填入下面
        })
        $('.splice').each(function(x, y) {
            $(y).click(function() {
                console.log($(this).parent().parent().remove())
            })
        })
    }
}