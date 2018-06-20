// 判断管理员是否登录
$.ajax({
    type: 'get',
    async: false,
    url: APP.baseUrl + '/employee/checkRootLogin',
    success: function (msg) {
        if (msg.message) {
            location.href = 'login.html';
        }
    }
})


// 操作函数
$(function () {
    // 声明两个函数用于发送Ajax请求的参数
    var page = 1;
    var pageSize = 100;
    $.ajax({
        type: 'get',
        url: APP.baseUrl + '/user/queryUser',
        data: {
            page: page,
            pageSize: pageSize
        },
        success:function (msg) {
            // 调用模板,渲染到页面上
            var html = template('userTpl',msg);
            $('#userBox').append(html);
        }
    })

    // 点击启用禁用按钮的视候发送Ajax请求
    $('#userBox').on('click','.btnStudy',function () {
        // 声明两个变量 获取DOM元素中的自定义属性，Ajax请求参数使用
        var id = $(this).data('id');
        var isDelete = $(this).data('isdelete');
        $.ajax({
            type:'post',
            url: APP.baseUrl + '/user/updateUser',
            data: {
              id:id,
                // 判断当前isDelete是启用还是禁用 然后发送到后台的数据取反
                // 1 为 禁用   0 为 启用
              isDelete: isDelete == 1 ? 0 : 1
            },
            success:function (msg) {
                // 判断返回值是否有success这个属性，有的话就是修改成功然后刷新页面
                if (msg.success) {
                    location.reload();
                } else {
                    // 弹出错误信息
                    alert(msg.message);
                }
            }
        })
    })
})