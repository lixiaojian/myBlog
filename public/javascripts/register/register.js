/**
 * Created by 872458899@qq.com on 2017/12/31.
 */
;$(function () {
    //手机号码的正则
    var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
    //邮箱的正则
    var emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
    var form = $('#registerForm');
    var errorMsg = $('#error_msg');
    function checkUserName(userName) {
        return $.ajax({
            url: '/api/user/checkUserIsExist',
            dataType: 'json',
            method: 'get',
            data: {userName: userName}
        })
    }
    //验证用户名是否已存在
    $('#user_name').on('blur', function () {
        var userName = $(this).val();
        if (userName) {
            checkUserName(userName).then(function (result) {
                if(result.code === 0 && result.data !== 0){
                    setMessage('该用户名已被注册！');
                }
            })
        }
    })
    $('#register_button').on('click', function () {
        var data = {};
        var formData = form.serializeArray();
        $.each(formData, function () {
            data[this.name] = this.value;
        });
        if (!data.userName) {
            setMessage('用户名不能为空！');
            return;
        }
        if (!data.password) {
            setMessage('登录密码不能为空！');
            return;
        } else if (data.password.length < 6 || data.password.length > 16) {
            setMessage('登录密码必须为6到16位！');
            return;
        }
        if (!data.rePassword) {
            setMessage('确认密码不能为空！');
            return;
        }
        if (data.password !== data.rePassword) {
            setMessage('两次密码输入不一致！');
            return;
        }
        if (data.phone && !phoneReg.test(data.phone)) {
            setMessage('您输入的手机号码格式不正确！');
            return;
        }
        if (data.email && !emailReg.test(data.email)) {
            setMessage('您输入的邮箱格式不正确！');
            return;
        }
        checkUserName(data.userName).then(function (result) {
            if(result.code === 0 && result.data !== 0){
                setMessage('该用户名已被注册！');
                return;
            }else{
                $.ajax({
                    url:'/api/user/register',
                    dataType:'json',
                    method:'post',
                    data:data,
                    success:function (resp) {
                        if(resp.code ===0){
                            location.href = '/login';
                        }else{
                            setMessage(resp.message || '注册失败');
                        }
                    }
                })
            }
        })
    });
    //设置错误信息
    var clearErrorTimmer = null;

    function setMessage(message) {
        clearTimeout(clearErrorTimmer);
        if (message) {
            form.addClass('has-error');
            clearErrorTimmer = setTimeout(function () {
                form.removeClass('has-error');
            }, 5000);
        } else {
            form.removeClass('has-error');
        }
        errorMsg.html(message);
    }
});