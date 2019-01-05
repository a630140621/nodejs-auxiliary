// 交集
Object.defineProperty(Array.prototype, "$intersection", {
    enumerable: false,
    writable: false,
    value: function (another_array = []) {
        return _intersection(this, another_array);
    }
})

// 并集
Object.defineProperty(Array.prototype, "$union", {
    enumerable: false,
    writable: false,
    value: function (another_array = []) {
        return _union(this, another_array)
    }
})

// 差集
Object.defineProperty(Array.prototype, "$difference", {
    enumerable: false,
    writable: false,
    value: function (another_array = []) {
        return _difference(this, another_array)
    }
})

function _intersection(a, b) {
    return a.filter(v => b.includes(v));
}


function _union(a, b) {
    return a.concat(b.filter(v => !a.includes(v)));
}


function _difference(a, b) {
    return a.filter(v => !a.includes(v) || !b.includes(v));
}


// 从数组中移除某个 值
// function remove(array, value) {
//     array.splice(array.indexOf(value), 1);
//     return array;
// }