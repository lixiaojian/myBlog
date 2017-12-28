/**
 * Created by 872458899@qq.com on 2017/12/28.
 */
var express = require('express');
var router = express.Router();
var UserService = require('../server/service/UserService');

/* GET users listing. */
router.get('/register', function (req, res, next) {
    res.render('register',{});
});
router.post('/register', function (req, res, next) {
    const {userName,password,sex,email} = req.body;
    let data = {
        userName,
        password,
        sex,
        email
    }
    UserService.saveUser(data).then(result=>{
        console.log(result);
    }).catch(ex=>{
        console.log(ex);
    })
});

module.exports = router;
