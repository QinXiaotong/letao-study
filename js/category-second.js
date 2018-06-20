$(function () {


    var page = 1;
    var pageSize = 10;

    // 二级分类数据渲染
    $.ajax({
        type:'get',
        url:APP.baseUrl + '/category/querySecondCategoryPaging',
        data: {
            page:page,
            pageSize:pageSize
        },
        success:function (msg) {
            var html = template('categorySecondTpl', {
                list: msg,
                api:APP.baseUrl
            });
            $('#categorySecondBox').html(html);
        }
    })

    // 一级分类数据列表
    $.ajax({
        url: APP.baseUrl + '/category/queryTopCategoryPaging',
        type: 'get',
        data: {
            page: 1,
            pageSize: 100000
        },
        success: function (response) {

            if (response.error) {
                location.href='login.html';
            }else{
                var html = template('categoryTpl', response);
                $('#categoryBox').html(html);
            }

        }
    });

    var brandLogo = '';
    // 上传图片路径
    $('#fileChange').fileupload({
        dataType: 'json',
        done: function (e, data) {
            console.log(data);
            // 存储图片地址
            brandLogo = data._response.result.picAddr;
            // 拼接图片url
            var imgUrl= APP.baseUrl + data._response.result.picAddr;
            // 将图片渲染到页面中
            $("#imgPreview").attr("src",imgUrl);
        }
    });



    // 添加商品
    $('#addBtn').click(function () {

        var brandName = $('#brandName').val();
        var categoryId = $('#categoryBox').val();
        var hot = 1;

        $.ajax({
            type:'post',
            url:APP.baseUrl + '/category/addSecondCategory',
            data: {
                brandName:brandName,
                categoryId:categoryId,
                brandLogo:brandLogo,
                hot:hot
            },
            success:function (msg) {
                if(msg.success) {
                    location.reload();
                } else {
                    alert(msg.message);
                }
            }
        })
    })

})