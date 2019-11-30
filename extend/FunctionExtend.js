const lodash = require("lodash");


// 交集
Object.defineProperty(Function.prototype, "$memoize", {
    enumerable: false,
    writable: false,
    /**
     * @param {Function} resolver 使用该函数返回的值作为 memoize 的 key, 该函数的参数是调用原函数的所有参数
     * 
     * eg.
     *  function a(param1, param2) {}
     *  let b = a.$memoize((...args) => { // args = [param1, param2]
     *  })
     */
    value: function (resolver) {
        return lodash.memoize(this, resolver);
    }
});
