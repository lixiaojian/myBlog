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
    user.createTime = new Date();
    var u = new User(user);
    return u.save();
}
/**
 * 通过用户名查询用户
 * @param userName
 */
module.exports.queryUserByUserName=(userName)=>{
    return User.findOne({userName});
}
/**
 * 通过条件查询用户
 */
module.exports.queryUser = (param={},page={})=>{
    let {size,number} = page;
    size =  +size || 10;
    number =  +number || 1;
    //需要查询的字段名
    const userPro = '_id userName nickName userType email phone sex createTime';
    if(page.number){
        let totalCount=0;
        return User.count(param).then(count=>{
            totalCount = count;
            return User.find(param,userPro).limit(size).skip((number-1) * size)
        }).then(result=>{
            return new Promise((resolve,reject)=>{
                const data = {
                    data:result,
                    pageNumber:number,
                    pageSize:size,
                    total:totalCount
                }
                resolve(data);
            })
        })
    }else{
        return User.find(param,userPro);
    }
}
