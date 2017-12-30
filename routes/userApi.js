/**
 * Created by 872458899@qq.com on 2017/12/30.
 */
var express = require('express');
var router = express.Router();
var UserService = require('../server/service/UserService');
const TokenService = require('../server/service/TokenService');
const encryptPassword = require('../utils').encryptPassword;
const {getClientIp,getEncAse192} = require('../utils');

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
    let userInfo = {};
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
            userInfo = result;
            //写TOKEN
            const userIp = getClientIp(req);
            //token的生成对用户名加密
            const userToken = getEncAse192(userName,result.salt);
            return TokenService.saveUserToken({userName,userToken,userIp});
        }else{
            responseData.code = 2;
            responseData.message = '用户名或密码不正确';
            res.json(responseData);
            return;
        }
    }).then(result=>{
        if(result){
            responseData.code = 0;
            //用户信息
            const user = {
                userName: userInfo.userName,
                sex: userInfo.sex,
                email: userInfo.email,
                id: userInfo._id
            };
            responseData.data = {
                cb,
                user: user
            };
            //给浏览器发送一个cookie，浏览器会记录该cookie 过期时间8个小时
            req.cookies.set('userInfo',JSON.stringify({userName,userToken:result.userToken}),{maxAge:8*3600*1000});
            responseData.message = '登录成功！';
            res.json(responseData);
        }else{
            responseData.code = 99;
            responseData.message = '服务器错误，请稍后重试！'
            res.json(responseData);
        }
    }).catch(ex => {
        responseData.code = 99;
        responseData.message = '服务器错误，请稍后重试！'
        res.json(responseData);
    })
})
module.exports = router;