const lodash = require("lodash");


/**
 * 判断这个对象是否为空('{}')
 */
Object.defineProperty(Object.prototype, "$isEmpty", {
    enumerable: false,
    writable: false,
    value: function () {
        return _isEmpty(this);
    }
});

/**
 * 获取指定 path 的值, 若没有则返回 default_value
 * @param {String} path 'key' 或 'key1.key2'
 * @param {String} default_value 若指定 path 不存在则返回这个默认值
 */
Object.defineProperty(Object.prototype, "$get", {
    enumerable: false,
    writable: false,
    value: function (path, default_value) {
        return lodash.get(this, path, default_value);
    }
});

/**
 * 判断对象指定 path 的值是否存在
 */
Object.defineProperty(Object.prototype, "$has", {
    enumerable: false,
    writable: false,
    value: function (path) {
        return lodash.has(this, path);
    }
});

/**
 * 深拷贝
 */
Object.defineProperty(Object.prototype, "$deepClone", {
    enumerable: false,
    writable: false,
    value: function () {
        return lodash.cloneDeep(this);
    }
});

/**
 * 对这个对象 key 对应的 value 进行类型检验, 可检查的类型目前包括 (String, Number, Boolean, Array)
 * 检测不通过返回不通过原因的 string, 通过返回 true
 * @param {Object} inspect_obj , 类型不区分大小写
 * {
 *  key_1: 'Number',
 *  key_2: 'Boolean',
 *  key_3.key_4: 'Array',
 *  key_3.key_5: 'String'
 * }
 * 
 * @returns {String|null} 若返回值为 String 则表示原对象经检查后不满足要求
 */
Object.defineProperty(Object.prototype, "$inspect", {
    enumerable: false,
    writable: false,
    value: function (inspect_obj) {
        return _inspect(this, inspect_obj);
    }
});

/**
 * 仅保留指定的key，不修改原对象
 */
Object.defineProperty(Object.prototype, "$reserveKeys", {
    enumerable: false,
    writable: false,
    value: function (keys) {
        return _reserveKeys(this, keys);
    }
});


function _reserveKeys(obj, keys) {
    if (!Array.isArray(keys)) throw new Error("keys must be an array");
    let obj_ = {};
    for (let key of keys) {
        obj_[key] = lodash.cloneDeep(obj[key]);
    }

    return obj_;
}

function _isEmpty(obj) {
    for (let key of Object.keys(obj)) {
        if (key) return false;
    }
    return true;
}

function _inspect(obj, inspect_obj) {
    for (let [path, value] of Object.entries(inspect_obj)) {
        let _expect_type_string = value.toLowerCase();

        let _value = obj.$get(path);
        let _type_string = typeof _value;
        // 检测类型是否正确
        switch (_expect_type_string) {
            case "string":
                if (_type_string !== "string") return `type error: ${path} expect String but receive ${_type_string}`;
                break;
            case "array":
                if (!Array.isArray(_value)) return `type error: ${path} expect Array|List but receive ${_type_string}`;
                break;
            case "boolean":
                if (_type_string !== "boolean") return `type error: ${path} expect Boolean but receive ${_type_string}`;
                break;
            case "number":
                if (_type_string !== "number") return `type error: ${path} expect Number but receive ${_type_string}`;
                break;
            default:
                return `not support: do not support this type#${_expect_type_string} inspect`;
        }
    }

    return true;
}


if (!module.parent) {
    // let a = {
    //     'a': 'a',
    //     'b': ['a', 'b'],
    //     'c': {
    //         'a': '',
    //         'c': true,
    //         'd': false
    //     }
    // }

    // let inspect_obj = {
    //     'a': 'String',
    //     'b': 'array',
    //     'c.a': 'string',
    //     'c.c': 'boolean',
    // }

    // console.log(a.$inspect(inspect_obj))
    let a = {
        "1": "2"
    };
    for (let key in a) {
        console.log(key);
    }
    console.log(a.$get("1"));
}