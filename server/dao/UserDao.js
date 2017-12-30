/**
 * Created by 872458899@qq.com on 2017/12/28.
 */
var mongoose = require('mongoose');
var usersSchema = require('../../scheams/users');

var User = mongoose.model('user', usersSchema);

/**
 * 保存用户
 * @param user
 */
module.exports.saveUser = (user)=>{
    var u = new User(user);
    return u.save();
}
/**
 * 通过用户名查询用户
 */
module.exports.getByUserName = (userName='')=>{
    var query  = User.where({userName});
    return query.findOne();
}
