/**
 * Created by 872458899@qq.com on 2017/12/31.
 */
;$(function () {
    var form = $('#login_form');
    var errorMsg = $('#error_msg');
    $('#login_button').on('click',function (e) {
        e.preventDefault();
        var data = {};
        var formData = form.serializeArray();
        $.each(formData, function() {
            data[this.name] = this.value;
        });
        if(!data.userName){
            setMessage('用户名不能为空！');
            return;
        }
        if(!data.password){
            setMessage('密码不能为空！');
            return;
        }
        $.ajax({
            url:'/api/user/login',
            method:'post',
            dataType:'json',
            data:data,
            success:function (result) {
                if(result.code === 0){
                    //如果是从注册页面跳转过来的 就不再跳回注册页
                    result.data = result.data || {};
                    var cb = result.data.cb;
                    if(cb && cb.indexOf('/register') === -1){
                        location.href = cb;
                    }else{
                        location.href = '/'
                    }
                }else{
                    setMessage(result.message || '登录失败！')
                }
            }
        })
    });
    var clearErrorTimmer = null;
    //设置错误信息
    function setMessage(message) {
        clearTimeout(clearErrorTimmer);
        if(message){
            form.addClass('has-error');
            clearErrorTimmer = setTimeout(function () {
                form.removeClass('has-error');
            },5000);
        }else{
            form.removeClass('has-error');
        }
        errorMsg.html(message);
    }
})