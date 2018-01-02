/**
 * Created by 872458899@qq.com on 2017/12/28.
 */
const UserDao = require('../dao/UserDao');
const encryptPassword = require('../../utils').encryptPassword;
/**
 * 保存用户
 * @param userName 用户名
 * @param password 密码
 * @param sex 性别
 * @param email 邮箱
 * @param userType 用户类型
 * @returns {*}
 */
module.exports.saveUser = ({userName, password, nickName,userType = 2}) => {
    if (!userName) {
        return new Promise(function (resolve, reject) {
            resolve({
                code: 1,
                message: '用户名不能为空'
            });
        });
    }
    if (!password) {
        return new Promise(function (resolve, reject) {
            resolve({
                code: 2,
                message: '用户密码不能为空'
            });
        });
    }
    const newPassword = encryptPassword(password);
    return UserDao.saveUser({userName, password: newPassword.password, nickName, userType,salt: newPassword.salt});
}

/**
 * 验证用户信息是否已被占用
 * @param param
 * @return {Promise|*|PromiseLike<T>|Promise<T>}
 */
module.exports.checkUserInfo = param=>{
    return UserDao.queryUser(param).then((result) => {
        if (result && result.length>0) {
            return new Promise(function (resolve, reject) {
                resolve({
                    code: 0,
                    data: 1,
                    message: ''
                });
            });
        } else {
            return new Promise(function (resolve, reject) {
                resolve({
                    code: 0,
                    data: 0,
                    message: ''
                });
            });
        }
    })
}
/**
 * 通过用户名查询用户
 * @param userName
 * @returns {*}
 */
module.exports.getUserByUserName=userName=>{
    return UserDao.queryUser({userName}).then(result=>{
        return new Promise((resove,reject)=>{
            resove(result[0]);
        })
    });
}
/**
 *
 * @param userName
 */
module.exports.queryUser=(param,page)=>{
    return UserDao.queryUser(param,page);
}
