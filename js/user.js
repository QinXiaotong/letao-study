$(function () {
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
            var html = template('userTpl',msg);
            $('#userBox').append(html);
        }

    })
    
    $('#userBox').on('click','.btnStudy',function () {
        var id = $(this).data('id');
        var isDelete = $(this).data('isdelete');
        $.ajax({
            type:'post',
            url: APP.baseUrl + '/user/updateUser',
            data: {
              id:id,
              isDelete: isDelete == 1 ? 0 : 1
            },
            success:function (msg) {
                if (msg.success) {
                    location.reload();
                } else {
                    alert('msg.message');
                }
            }
        })
    })
})