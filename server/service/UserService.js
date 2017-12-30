/**
 * Created by 872458899@qq.com on 2017/12/28.
 */
const UserDao = require('../dao/UserDao');
const encryptPassword = require('../../utils').encryptPassword;

module.exports.saveUser = ({userName,password,sex,email,userType=2}) =>{
    if(!userName){
        return new Promise(function (resolve, reject) {
            resolve({
                code:1,
                message:'用户名不能为空'
            });
        });
    }
    if(!password){
        return new Promise(function (resolve, reject) {
            resolve({
                code:2,
                message:'用户密码不能为空'
            });
        });
    }
    const newPassword = encryptPassword(password);
    return UserDao.saveUser({userName,password:newPassword.password,sex,email,userType,salt:newPassword.salt});
}