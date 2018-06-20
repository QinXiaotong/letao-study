$(function () {
    $('#loginBtn').click(function () {
        // 获取表单数据
        var result = $('#loginForm').serializeToJson();
        // 判断用户是否输入用户名
        if (!$.trim(result.username)) {
            alert('请输入用户名');
            return;
        }
        // 判断用户是否输入密码
        if (!$.trim(result.password)) {
            alert('请输入密码');
            return;
        }
        // 发送Ajax请求
        $.ajax({
            // 端口地址
            url:APP.baseUrl + '/employee/employeeLogin',
            // post方式发送
            type:'post',
            // 参数为一个对象
            data: result,
            // 回调函数
            success:function (msg) {
                // 判断 返回函数中是否存在success，存在表示登录成功
                if (msg.success) {
                    location.href = 'user.html';
                } else {
                    // 输出错误信息
                    alert(msg.message);
                }
            }
        })

    })
})