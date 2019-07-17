// 导出的函数参考 python3 的 random 模块
// 目前不提供随机数种子功能，且没有增加异常处理和参数检验

/**
 * 返回 [min, max] 范围内随机整数
 */
exports.randint = function (min, max) {
    let range = (max - min) * Math.random();
    return Math.round(range + min);
};

/**
 * 从 序列/列表 中随机选择一个值
 *  如果输入为 数组 则随机返回数组内的一个元素（不改变原数组）
 *  如果输入为 字符串 则随机返回一个字符
 */
exports.choice = function (sequence) {
    let [_, value] = _choice(sequence);
    return value;
};

function _choice(sequence) {
    let max = sequence.length - 1;
    let index = exports.randint(0, max);
    return [index, sequence[index]];
}

/**
 * 从 序列/列表 中随机选择 N 个元素
 */
exports.sample = function (sequence, count) {
    let selected = [];
    let selected_indexes = [];
    while (selected.length < count) {
        let [index, value] = _choice(sequence);
        if (!selected_indexes.includes(index)) {
            selected_indexes.push(index);
            selected.push({
                index,
                char: value
            });
        }
    }

    // console.dir(selected);
    return selected.map(item => item.char);
};

/**
 * 随机打乱 序列/列表 元素
 */
exports.shuffle = function (sequence) {
    return sequence.sort(_randomSort);
};

function _randomSort(a, b) {
    return Math.random() > 0.5 ? 1: -1;
}

/**
 * 随机生成 [0, 1) 范围内的浮点数
 */
exports.random = function () {
    return Math.random();
};