/**
 * Created by 872458899@qq.com on 2017/12/17.
 */
const crypto = require('crypto');

//为小于10的数字补0
function addZero(number) {
    return number<10?('0'+number):number;
};

/**
 * 日期的格式化
 * @param date
 * @returns {string}
 */
module.exports.dateFormat = function(date) {
    const d = new Date(date);
    return d.getFullYear()+'年'+addZero(d.getMonth()+1)+'月'+addZero(d.getDay())+'日 '+addZero(d.getHours())+'时'+addZero(d.getMinutes())+'分'+addZero(d.getSeconds())+'秒';
};

/*
 * 10位盐
 * 时间戳(2)+随机字母(8)
 * 用于密码加密
 */
const getSalt = () => {
    var time = Date.now() % 100,
        str = '';
    time = time === 0 ? '00' : String(time);
    for (let i = 0; i < 8; i++) {
        const base = Math.random() < 0.5 ? 65 : 97;
        str += String.fromCharCode(
            base +
            Math.floor(
                Math.random() * 26
            )
        );
    }
    return time + str;
};
/**
 * 进行MD5加密
 * @param text
 * @returns {PromiseLike<ArrayBuffer>}
 */
const makeMd5 = (text) => {
    return crypto.createHash("md5").update(String(text)).digest("hex");
};

/**
 * 对密码加密并返回新密码和盐值  不可逆
 * @param oriPassword
 * @param salt
 * @returns {{password: PromiseLike<ArrayBuffer>, salt: *}}
 */
module.exports.encryptPassword = (oriPassword,salt = getSalt()) => {
    return {
        password:makeMd5(makeMd5(oriPassword) + salt),
        salt:salt
    };
};

/**
 * @aes192加密模块
 * @param str string 要加密的字符串
 * @param secret string 要使用的加密密钥(要记住,不然就解不了密啦)
 * @retrun string 加密后的字符串
 * */
exports.getEncAse192 = function(str, secret) {
    var cipher = crypto.createCipher("aes192", secret); //设置加密类型 和 要使用的加密密钥
    var enc = cipher.update(str, "utf8", "hex");    //编码方式从utf-8转为hex;
    enc += cipher.final("hex"); //编码方式从转为hex;
    return enc; //返回加密后的字符串
}
/**
 * @aes192解密模块
 * @param str string 要解密的字符串
 * @param secret string 要使用的解密密钥(要和密码的加密密钥对应,不然就解不了密啦)
 * @retrun string 解密后的字符串
 * */
exports.getDecAse192 = function(str, secret) {
    var decipher = crypto.createDecipher("aes192", secret);
    var dec = decipher.update(str, "hex", "utf8");//编码方式从hex转为utf-8;
    dec += decipher.final("utf8");//编码方式从utf-8;
    return dec;
}


//获取url请求客户端ip
module.exports.getClientIp = function(req) {
    var ip = req.headers['x-forwarded-for'] ||
        req.ip ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress || '';
    if(ip.split(',').length>0){
        ip = ip.split(',')[0]
    }
    return ip;
};