/**
 * Created by 872458899@qq.com on 2017/12/30.
 */
var express = require('express');
var router = express.Router();
var UserService = require('../server/service/UserService');
const encryptPassword = require('../utils').encryptPassword;

let responseData;
//这里的next一定要调用
/**
 * 统一返回信息
 */
router.use((req, res, next) => {
    responseData = {
        code: 0,
        data: {},
        message: ''
    }
    next();
});
/**
 * 注册
 */
router.post('/user/register', function (req, res) {
    const {userName, password, sex, email} = req.body;
    let data = {
        userName,
        password,
        sex,
        email
    }
    return UserService.saveUser(data).then(result => {
        if (result.code !== undefined) {
            responseData.data = result.data;
            responseData.message = result.message;
            responseData.code = result.code;
            res.json(responseData);
        } else {
            //注册成功返回用户信息
            responseData.data = {
                userName: result.userName,
                sex: result.sex,
                email: result.email,
                id: result._id
            };
            responseData.message = '注册成功';
            responseData.code = 0;
            res.json(responseData);
        }

    }).catch(ex => {
        responseData.code = 1;
        responseData.message = '注册失败';
        res.json(responseData);
    })
});

/**
 * 验证用户是否存在
 * @param userName 用户名
 */
router.get('/user/checkUserIsExist', function (req, res) {
    var userName = req.query.userName;
    UserService.checkUserIsExist(userName).then((result) => {
        responseData.code = result.code;
        responseData.data = result.data;
        responseData.message = result.message;
        res.json(responseData);
    }).catch(ex => {
        responseData.code = 1;
        responseData.data = '';
        responseData.data = '获取用户信息失败';
        res.json(responseData);
    })
})
/**
 * 用户登录
 */
router.post('/user/login', function (req, res) {
    var {cb, userName, password} = req.body;
    UserService.getUserByUserName(userName).then(result => {
        if (!result) {
            responseData.code = 1;
            responseData.data = '';
            responseData.data = '用户不存在！';
            res.json(responseData);
            return;
        }
        var passwordObj = encryptPassword(password, result.salt);
        //登录成功
        if (passwordObj.password === result.password) {
            responseData.code = 0;
            responseData.data = {
                cb,
                user: {
                    userName: result.userName,
                    sex: result.sex,
                    email: result.email,
                    id: result._id
                }
            };
            responseData.message = '登录成功！';
        }else{
            responseData.code = 2;
            responseData.message = '用户名或密码不正确'
        }
        res.json(responseData);
    }).catch(ex => {
        responseData.code = 99;
        responseData.message = '服务器错误，请稍后重试！'
        res.json(responseData);
    })
})
module.exports = router;