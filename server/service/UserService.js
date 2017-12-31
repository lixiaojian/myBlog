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
module.exports.saveUser = ({userName, password, sex, email, userType = 2,phone}) => {
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
    return UserDao.saveUser({userName, password: newPassword.password, sex, email, userType, phone,salt: newPassword.salt});
}

/**
 * 验证用户是否存在 1:存在 0:不存在
 * @param userName
 */
module.exports.checkUserIsExist = (userName) => {
    return UserDao.getByUserName(userName).then((result) => {
        if (result) {
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
    return UserDao.getByUserName(userName);
}