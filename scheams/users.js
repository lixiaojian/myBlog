/**
 * Created by 872458899@qq.com on 2017/12/28.
 *
 * 用户的表结构
 */

var mongoose = require('mongoose');

module.exports =  mongoose.Schema({
    //用户名
    userName: String,
    //用户密码
    password:String,
    //用户邮箱
    email:String,
    //用户性别 1：男 2：女
    sex:Number,
    //用户类型 1：管理员 2：普通用户
    userType:Number,
    //密码盐值
    salt:String
})