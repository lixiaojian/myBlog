/**
 * Created by 872458899@qq.com on 2017/12/28.
 */
var UserDao = require('../dao/UserDao');

module.exports.saveUser = ({userName,password,sex,email,userType=2}) =>{
    if(!userName){
        return new Promise(function (resolve, reject) {
            resolve({
                code:'1',
                msg:'用户名不能为空'
            });
        });
    }
    if(!password){
        return new Promise(function (resolve, reject) {
            resolve({
                code:'2',
                msg:'用户密码不能为空'
            });
        });
    }
    return UserDao.saveUser({userName,password,sex,email,userType});
}