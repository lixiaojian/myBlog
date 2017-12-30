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
 * 对密码加密并返回新密码和盐值
 * @param oriPassword
 * @param salt
 * @returns {{password: PromiseLike<ArrayBuffer>, salt: *}}
 */
module.exports.encryptPassword = (oriPassword,salt = getSalt()) => {
    return {
        password:makeMd5(makeMd5(oriPassword) + getSalt()),
        salt:salt
    };
};