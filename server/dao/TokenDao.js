/**
 * Created by 872458899@qq.com on 2017/12/30.
 */
var mongoose = require('mongoose');
var tokenSchema = require('../../scheams/tokens');
var UserToken = mongoose.model('user_token', tokenSchema);

/**
 * 保存Token
 * @param token
 */
module.exports.saveUserToken = (token)=>{
    //先删除原来的值
    return UserToken.remove({userName:token.userName}).then(()=>{
        var ut = new UserToken(token);
        return ut.save();
    })
}
/**
 * 删除token
 * @param id
 */
module.exports.removeUserToken = (id)=>{
    return UserToken.remove({_id:id})
}
/**
 * 获取用户token
 * @param userName
 * @param token
 * @return {Promise|*|PromiseLike<T>|Promise<T>}
 */
module.exports.getUserToken = ({userName,userToken})=>{
    return UserToken.findOne({userName,userToken});
}


