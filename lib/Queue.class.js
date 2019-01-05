// denque
// https://www.npmjs.com/package/denque


/**
 * FIFO, 用原生的 Array 对象实现, 如果数据量过大性能方便不是很好
 */
class Queue {
    /**
     * 
     * @param {Number} maxsize 如果队列长度到达 maxsize 则插入失败
     */
    constructor(maxsize = null) {
        this._maxsize = maxsize;
        this._array = [];
    }

    put(item) {
        if (this._maxsize !== null && this._maxsize <= this._array.length) return false;
        this._array.push(item);
        return true;
    }

    get() {
        return this._array.shift();
    }

    isEmpty() {
        return this._array.length === 0;
    }

    isFull() {
        if (this._maxsize === null) return false;
        if (this._array.length === this._maxsize) return true;
        return false;
    }
}


module.exports = Queue;


// if (!module.parent) {
//     let a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
//     let queue = new Queue(10);
//     a.map(item => {
//         queue.put(item)
//         console.log(queue.isFull())
//     })
// }