/**
 * Created by 872458899@qq.com on 2017/12/17.
 */
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