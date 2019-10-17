let _cache = {};

class Cache {
    /**
     * @param {String} name 缓存名称，相同的名称返回同一个实例
     */
    constructor(name) {
        if (_cache[name]) return _cache[name];

        this.name = name;
        this._store = {};
        _cache[name] = this;
    }

    /**
     * 缓存一个 key: value
     * @param {String} key 
     * @param {Object} value 
     * @param {Int} timeout 单位 ms
     */
    set(key, value, timeout) {
        this["_store"][key] = value;
        if (timeout && !Number.isNaN(timeout)) {
            setTimeout(() => {
                delete this["_store"][key];
            }, timeout);
        }
    }

    /**
     * 根据 key 返回缓存的值，如果指定的 key 不存在返回值或者已经过期，则返回第二个参数指定的值
     * @param {String} key 
     * @param {Object} d 当 key 不存在或过期时返回的值
     */
    get(key, d = "") {
        return (key in this["_store"]) ? this["_store"][key] : d;
    }

    /**
     * 判断当前缓存中是否有对应的缓存
     * @param {String} key 缓存 key
     */
    has(key) {
        return key in this["_store"];
    }
}

module.exports = Cache;