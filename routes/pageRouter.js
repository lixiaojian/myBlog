/**
 * Created by 872458899@qq.com on 2017/12/30.
 */
var express = require('express');
var router = express.Router();
const TokenService = require('../server/service/TokenService');
const UserService = require('../server/service/UserService');

/**
 * 主页
 */
router.get('/', function(req, res, next) {
    var userInfo = req.userInfo;
    if(userInfo.userName){
        //用户已登录
        var userToken = req.userToken || {};
        res.render('index',{user:userToken});
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
    //设置回调链接
    let cb = req.headers.referer || '';
    res.render('login',{cb});
})
/**
 * 退出登录
 */
router.get('/logout',function (req, res) {
    //设置回调链接
    //把cookie清掉
    req.cookies.set('userInfo',{},{maxAge:-1});
    res.redirect('login')
})
/**
 * 用户列表
 */
router.get('/userlist',function (req, res) {
    //设置回调链接
    const pageNumber = req.query.pn || 1;
    var userInfo = req.userInfo;
    UserService.queryUser({},{number:pageNumber}).then(result=>{
        console.log(result);
        if(userInfo.userName){
            //用户已登录
            var userToken = req.userToken || {};
            res.render('userList',{user:userToken});
        }else{
            //用户未登录
            res.render('userList',{user:{}});
        }
    })
})

module.exports = router;