/**
 * Created by 872458899@qq.com on 2017/12/30.
 */
const TokenDao = require('../dao/TokenDao');
/**
 * 保存token
 * @param userName
 * @param token
 * @returns {*}
 */
module.exports.saveUserToken = ({userName, userToken,userIp,userType}) => {
    return TokenDao.saveUserToken({userName, userToken,userIp,userType});
}

/**
 *
 * 删除token
 * @param id
 * @return {*}
 */
module.exports.removeUserToken = (id) => {
    console.log(id);
    return TokenDao.removeUserToken(id);
}
/**
 * 获取用户token
 * @param userName
 * @param userToken
 * @return {Promise|*|PromiseLike<T>|Promise<T>}
 */
module.exports.getUserToken = ({userName, userToken}) => {
    return TokenDao.getUserToken({userName, userToken});
}