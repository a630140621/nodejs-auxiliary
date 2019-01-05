// const promisify = require("es6-promisify").promisify;


exports.promisify = promisify;
exports.promisifyMany = promisifyMany;
exports.promisifyAll = promisifyAll;


// https://75team.com/post/how-to-convert-callback-to-promise.html
/**
 * 将一个回调式函数转化为 原生 Promise 函数, 如果原生函数有多个返回值则返回一个数组
 * @param {Function} func 
 */
function promisify(func) {
    if (typeof func !== 'function') throw new TypeError('Argument must be a function');

    return new Proxy(func, {
        apply(func, thisArg, args) {
            // console.log(func, thisArg, args)
            return new Promise((resolve, reject) => {
                func.apply(thisArg, [...args, (error, ...others) => {
                    if (error) return reject(error);
                    if (others.length === 0) return resolve(); // 没有返回值
                    if (others.length === 1) return resolve(others[0]); // 返回一个值
                    return resolve(others); // 返回多个值
                }])
            })
        }
    })
}


// 暂时实现的代理不支持 this, 可以在 get 中调用 bind(), 来实现
/**
 * 将 Class 或者 Object 的 异步函数转化为 原生promise, 自动绑定 this
 * 被代理的对象的函数必须是异步函数, 且最后一个参数为回调函数
 *  1. 使用时传入 callback 函数, 转化为 promise
 *  2. 使用时未传入 callback 函数, 不作处理
 * 
 * @param {Object} target 对象或类的实例
 * @param {Array} proxy_func_list 需要代理的函数名数组
 */
function promisifyMany(target, proxy_func_list = []) {
    return new Proxy(target, {
        get(target, prop_key) {
            if (typeof target[prop_key] === 'function' && proxy_func_list.includes(prop_key)) {
                return promisify(target[prop_key]);
            }
            return Reflect.get(target, prop_key);
        }
    })
}

/**
 * 代理一个类的实例或者对象的所有函数, 并自动绑定this
 * 
 * 注: 如果一个类的实例或对象内部的方法既有异步函数又有同步函数(最后一个不是回调函数),会造成这个函数不可用(不会返回)
 * @param {Object} target 对象或者一个类的实例
 */
function promisifyAll(target) {
    return new Proxy(target, {
        get(target, prop_key) {
            if (typeof target[prop_key] === 'function') {
                return promisify(target[prop_key]);
            }
            return Reflect.get(target, prop_key);
        }
    })
}

// es6-promisify 的实现
// /**
//  * promisify()
//  * Transforms callback-based function -- func(arg1, arg2 .. argN, callback) -- into
//  * an ES6-compatible Promise. Promisify provides a default callback of the form (error, result)
//  * and rejects when `error` is truthy.
//  *
//  * @param {function} original - The function to promisify
//  * @return {function} A promisified version of `original`
//  */
// function promisify(original) {
//     // Ensure the argument is a function
//     if (typeof original !== "function") {
//         throw new TypeError("Argument to promisify must be a function");
//     }

//     return function (...args) {
//         return new Promise((resolve, reject) => {
//             // Append the callback bound to the context
//             args.push(function callback(err, ...values) {
//                 if (err) return reject(err);
//                 if (values.length === 0) return resolve();
//                 if (values.length === 1) return resolve(values[0]);
//                 resolve(values);
//             });

//             // Call the function.
//             original.call(this, ...args);
//         });
//     };
// }