/**
 * Created by 872458899@qq.com on 2017/12/31.
 */
;$(function () {
    layer.config({
        shade:0.5
    })
    //手机号码的正则
    var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
    //邮箱的正则
    var emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
    var form = $('#registerForm');
    var errorMsg = $('#error_msg');
    //验证用户名
    function checkUserName(userName) {
        return $.ajax({
            url: '/api/user/checkUserIsExist',
            dataType: 'json',
            method: 'get',
            data: {userName: userName}
        })
    }
    //验证昵称
    function checkNickName(nickName) {
        return $.ajax({
            url: '/api/user/checkNickNameIsExist',
            dataType: 'json',
            method: 'get',
            data: {nickName: nickName}
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
    //验证用户昵称是否已存在
    $('#nick_name').on('blur', function () {
        var nickName = $(this).val();
        if (nickName) {
            checkNickName(nickName).then(function (result) {
                if(result.code === 0 && result.data !== 0){
                    setMessage('该昵称已被占用！');
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
        var index = layer.load(3,{shade:0.5});
        checkUserName(data.userName).then(function (result) {
            if(result.code === 0 && result.data !== 0){
                setMessage('该用户名已被注册！');
                layer.close(index);
                return;
            }
            return checkNickName(data.nickName);
        }).then(function (result) {
            if(result.code === 0 && result.data !== 0){
                setMessage('该昵称已被占用！');
                layer.close(index);
                return;
            }else{
                $.ajax({
                    url:'/api/user/register',
                    dataType:'json',
                    method:'post',
                    data:data,
                    success:function (resp) {
                        layer.close(index);
                        if(resp.code ===0){
                            layer.msg('注册成功', {
                                icon: 1,
                                shade:0.5
                            }, function(){
                                location.href = '/login';
                            });

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