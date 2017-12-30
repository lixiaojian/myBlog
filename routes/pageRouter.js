/**
 * Created by 872458899@qq.com on 2017/12/30.
 */
var express = require('express');
var router = express.Router();

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