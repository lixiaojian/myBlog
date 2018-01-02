/**
 * Created by 872458899@qq.com on 2017/12/30.
 */
var express = require('express');
var router = express.Router();
const TokenService = require('../server/service/TokenService');

/**
 * 主页
 */
router.get('/', function(req, res, next) {
    var userInfo = req.userInfo;
    if(userInfo.userName){
        const {userName,userToken} = userInfo;
        //获取用户Token信息
        // TokenService.getUserToken({userName,userToken}).then((result=>{
        //     console.log(result);
        // }))
        //用户已登录
        res.render('index',{user:userInfo});
    }else{
        //用户未登录
        res.render('index',{user:{}});
    }
});
/**
 * 用户注册页
 */
router.get('/register', function (req, res, next) {
    res.render('register',{});
});
/**
 * 登录页，如果有原页面就跳回原页面
 */
router.get('/login',function (req, res) {
    var cb = req.query.cb || '';
    res.render('login',{cb,message:''});
})
module.exports = router;