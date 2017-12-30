/**
 * Created by 872458899@qq.com on 2017/12/30.
 */
var express = require('express');
var router = express.Router();
var UserService = require('../server/service/UserService');

let responseData;
//这里的next一定要调用
router.use((req,res,next)=>{
    responseData={
        code:0,
        data:{},
        message:''
    }
    next();
});
/**
 * 注册
 */
router.post('/user/register', function (req, res, next) {
    const {userName,password,sex,email} = req.body;
    let data = {
        userName,
        password,
        sex,
        email
    }
    return UserService.saveUser(data).then(result=>{
        if(result.code !== undefined){
            responseData.data = result.data;
            responseData.message = result.message;
            responseData.code = result.code;
            res.json(responseData);
        }else{
            //注册成功返回用户信息
            responseData.data = {
                userName:result.userName,
                sex:result.sex,
                email:result.email,
                id:result._id
            };
            responseData.message = '注册成功';
            responseData.code = 0;
            res.json(responseData);
        }

    }).catch(ex=>{
        responseData.code = 1;
        responseData.message = '注册失败';
        res.json(responseData);
    })
});

module.exports = router;