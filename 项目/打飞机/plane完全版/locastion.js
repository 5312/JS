var cloud = cvh;
var num = false;
var clouds = true;
var ins = false;

function locasstion_draw(callback) {
    if (ins) {
        callback();
    }
    cloud = cloud <= 0 ? 0 : cloud -= 4
    if (clouds) {
        // 绘制遮罩
        ctx.beginPath();
        ctx.fillStyle = 'rgba(44, 61, 71, 0.7)';
        ctx.fillRect(0, cloud, cvw, cvh);
    }
    if (cloud == 0) {
        if (!num) {
            $('<div><span>用户名</span><input type="text"></div>　').appendTo('body');
            $('<div><span>密&emsp;码</span><input type="text"></div>').appendTo('body');
            $('<div class="signin">登录</div><div class="signout">注册</div>').appendTo('body');
            $('.signin').on('click', function() {
                var user = $('input:eq(0)').val();
                var pass = $('input:eq(1)').val();
                if (localStorage.getItem('users')) {
                    var down = JSON.parse(localStorage.getItem('users'));
                    for (var i = 0; i < down.length; i++) {
                        if (down[i].user == user && down[i].pass == pass) {
                            // alert('登录成功');
                            clouds = false;
                            $('div').remove();
                            ins = true;
                        }
                    }

                } else {
                    alert('请注册')
                }

            })
            $('.signout').on('click', function() {
                var user = $('input:eq(0)').val();
                var pass = $('input:eq(1)').val();
                var u = {
                    user: user,
                    pass: pass
                }
                if (localStorage.getItem('users')) {
                    var down = JSON.parse(localStorage.getItem('users'));
                    for (var i = 0; i < down.length; i++) {
                        if (down[i].user == user) {
                            alert('请不要重复注册')
                            return;
                        }
                    }
                    down.push(u)
                    localStorage.setItem('users', JSON.stringify(down))
                } else {
                    var ns = [u]
                    localStorage.setItem('users', JSON.stringify(ns))
                }

            })
            num = true;
        }
    }

}