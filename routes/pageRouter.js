/**
 * Created by 872458899@qq.com on 2017/12/30.
 */
var express = require('express');
var router = express.Router();

/**
 * 用户注册页
 */
router.get('/user/register', function (req, res, next) {
    res.render('register',{});
});
module.exports = router;