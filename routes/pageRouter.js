/**
 * Created by 872458899@qq.com on 2017/12/30.
 */
var express = require('express');
var router = express.Router();
const TokenService = require('../server/service/TokenService');
const UserService = require('../server/service/UserService');
const ArticlesService = require('../server/service/ArticleService');

/**
 * 主页
 */
router.get('/', function(req, res, next) {
    res.redirect('/articles')
    // var userInfo = req.userInfo;
    // if(userInfo.userName){
    //     //用户已登录
    //     var userToken = req.userToken || {};
    //     res.render('index',{user:userToken});
    // }else{
    //     //用户未登录
    //     res.render('index',{user:{}});
    // }
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
    //把cookie清掉
    req.cookies.set('userInfo',{},{maxAge:-1});
    res.redirect('login');
})
/**
 * 用户列表
 */
router.get('/userlist',function (req, res) {
    //设置回调链接
    var userInfo = req.userInfo;
    UserService.queryUser({},{number:1}).then(result=>{
        if(userInfo.userName){
            //用户已登录
            var userToken = req.userToken || {};
            res.render('userList',{user:userToken,users:result});
        }else{
            //用户未登录
            res.render('userList',{user:{},users:result});
        }
    })
})
/**
 * 跳转到添加文章的页面
 */
router.get('/addArticle',function (req, res) {
    res.render('addArticle',{});
})
/**
 * 跳转到文章列表页面
 */
router.get('/articles',function (req, res) {
    //设置回调链接
    var userInfo = req.userInfo;
    ArticlesService.queryArticle({},{number:1}).then(result=>{
        if(userInfo.userName){
            //用户已登录
            var userToken = req.userToken || {};
            res.render('articleList',{user:userToken,articles:result.data,title:'文章列表'});
        }else{
            //用户未登录
            res.render('articleList',{user:{},articles:result.data,title:'文章列表'});
        }
    })
})
/**
 * 跳转到文章详情页
 */
router.get('/article/:id',function (req, res) {
    const id = req.params.id;
    var userInfo = req.userInfo;
    ArticlesService.queryArticleById(id).then(function (result) {
        if(result.code){

        }else{
            if(userInfo.userName){
                //用户已登录
                var userToken = req.userToken || {};
                res.render('artcleDetail',{user:userToken,article:result});
            }else{
                //用户未登录
                res.render('artcleDetail',{user:{},article:result});
            }
        }
    })
})

module.exports = router;