$(function () {

    var page = 1;
    var pagesize = 5;
    var totalsize = 0;
    getData();

    // 当上一页按钮被点击的时候
    $('#prev').on('click', function () {

        page--;

        if (page < 1) {
            page = 1;
            alert('已经是第一页了')
            return;
        }

        // 获取数据
        getData ();

    });

    // 当下一页按钮被点击的时候
    $('#next').on('click', function () {

        page++;

        if (page > totalPage) {
            page = totalPage;
            alert('已经没有更多数据了');
            return;
        }

        // 获取数据
        getData ();

    });

    // 获取数据
    function getData () {

        $.ajax({
            url: APP.baseUrl + '/category/queryTopCategoryPaging',
            type: 'get',
            data: {
                page: page,
                pageSize: pagesize
            },
            success: function (response) {

                if (response.error) {
                    location.href='login.html';
                }else{
                    var html = template('categoryFirstTpl', response);
                    $('#categoryFirstBox').html(html);
                }

                // 计算总页数
                totalPage = Math.ceil(response.total / pagesize);
            }
        });

    }

    // 添加分类
    $('#bcBtn').click(function () {
        var result = $.trim($('#addForm').val());

        if (!result) {
            alert('请输入类名');
            return;
        }

        $.ajax({
            type: 'post',
            url: APP.baseUrl + '/category/addTopCategory',
            data: {
                categoryName:result
            },
            success:function (msg) {
                if (msg.success) {
                    location.reload();
                } else {
                    alert(msg.message);
                }
            }

        })
    })
})