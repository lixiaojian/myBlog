/**
 * Created by 872458899@qq.com on 2017/12/30.
 * token 的表结构
 */

var mongoose = require('mongoose');

module.exports =  mongoose.Schema({
    //用户名
    userName: String,
    //用户密码
    userToken:String,
    //用户最后一次访问的IP
    userIp:String,
    //过期时间 8个小时
    createdAt:{
        type:Date,
        default: Date.now,
        expires: '8h'
    }
})