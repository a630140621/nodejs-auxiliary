/**
 * 包装一个 async 函数, 如果超过指定时间函数没有返回则抛出异常
 * @param {Number} timeout 超时时间(ms)
 * @return {Promise}
 */
exports.timeoutDecorator = function (func, timeout = 0) {
    return function (...args) {
        return Promise.race([
            func(...args),
            new Promise((resolve, reject) => {
                setTimeout(() => reject(new Error(`timeout: after ${timeout} ms`)), timeout)
            })
        ])
    }
};

/**
 * 延迟多长时间后执行下一条语句（因为内部使用　setTimeout　函数，所以最长延迟24天）
 * @param {Number} time 延迟时间（ms）
 */
exports.delay = function (time = 0) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}