const request = require('request-promise-native');


/**
 * 包装一个 async 函数, 如果超过指定时间函数没有返回则
 * @param {Number} timeout 超时时间(ms)
 */
function timeoutDecorator(timeout = 0) {
    return function (func) {
        return function (...args) {
            return Promise.race([
                func(...args),
                new Promise((resolve, reject) => {
                    setTimeout(() => reject(new Error(`timeout: ${timeout}`)), timeout)
                })
            ])
        }
    }
}


if (!module.parent) {
    (async () => {
        let request_decorator_1 = timeoutDecorator(3 * 1000)(request)
        let request_decorator_2 = timeoutDecorator(10 * 1000)(request)
        let request_decorator_3 = timeoutDecorator(6 * 1000)(request)

        await request_decorator_2({
            uri: 'http://admin:123@localhost:8811/test',
            method: 'get',
            timeout: 60 * 1000,
            json: true
        })

        // let promises = [
        //     request_decorator_1({
        //         uri: 'http://admin:123@localhost:8811/',
        //         method: 'get',
        //         timeout: 60 * 1000,
        //         json: true
        //     }),
        //     request_decorator_2({
        //         uri: 'http://admin:123@localhost:8811/test',
        //         method: 'get',
        //         timeout: 60 * 1000,
        //         json: true
        //     }),
        //     request_decorator_3({
        //         uri: 'http://admin:123@localhost:8811/test',
        //         method: 'get',
        //         timeout: 60 * 1000,
        //         json: true
        //     }).catch(error => console.log(error))
        // ]
        try {
            // setTimeout(() => {
            //     console.log('111')
            // }, 12000)
            // let ret = await Promise.all(promises)
            // console.log(ret)
        } catch (error) {
            console.log(error)
        }
    })()
}