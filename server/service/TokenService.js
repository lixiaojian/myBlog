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
module.exports.saveUserToken = ({userName, userToken,userIp}) => {

    return TokenDao.saveUserToken({userName, userToken,userIp});
}