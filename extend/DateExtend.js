/**
 * 将一个日期格式化成指定的格式,默认为 'yyyy-MM-dd hh:mm:ss'
 * eg: new Date('2018-6-1').$toFormatDateString() == '2018-06-01 00:00:00';
 *     new Date('2018-6-1').$toFormatDateString('yyyy/MM/dd hh:mm:ss') == '2018/06/01 00:00:00';
 *     new Date('2018-6-1').$toFormatDateString('yyyyMMdd') == '20180601';
 * @param {*} fmt 
 */
Object.defineProperty(Date.prototype, "$format", {
    enumerable: false,
    writable: false,
    value: function (fmt = 'yyyy-MM-dd hh:mm:ss') {
        return _dateFormat(this, fmt);
    }
})

/**
 * date format YYYY-MM-dd hh:mm:ss.S
 * @param  {Date} date [description]
 * @param  {String} fmt  [description]
 * @return {String} 格式化后的日期字符串
 */
function _dateFormat(date, fmt) {
    var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        "S": date.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let [key, value] of Object.entries(o)) {
        if (new RegExp(`(${key})`).test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (value) : (("00" + value).substr(("" + value).length)));
    }

    return fmt;
}