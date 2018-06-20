$(function () {
    $('#loginBtn').click(function () {
        var result = $('#loginForm').serializeToJson();
        if (!$.trim(result.username)) {
            alert('请输入用户名')
        }
        if (!$.trim(result.password)) {
            alert('请输入密码')
        }

        $.ajax({
            url:APP.baseUrl + '/employee/employeeLogin',
            type:'post',
            data: result,
            success:function (msg) {
                if (msg.success) {
                    location.href = 'user.html';
                } else {
                    alert(msg.message);
                }
            }
        })

    })
})