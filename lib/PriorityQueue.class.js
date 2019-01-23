// const Denque = require("denque");


/**
 * 方案一: 使用 队列 来实现
 *  每次 push 操作将遍历队列并将元素放到正确的位置
 *  每次 pop 操作获取队列的最后一个元素
 */
class PriorityQueue {
    /**
     * 队列的最大长度, 0表示无长度限制
     * @param {Int} maxsize 
     */
    constructor(maxsize = 0) {
        this.maxsize = maxsize;
        // this._denque = new Denque();
        this._queue = [];
    }

    /**
     * 入队操作, 如果到达了队列的最大长度则不会继续添加
     */
    push(item, priority) {
        let element = {
            item,
            priority
        };

        if (this._queue.length === 0) {
            this._queue.push(element);
            return;
        }

        if (!this.isFull()) {
            for (let [index, elem] of this._queue.entries()) {
                // 队列的最后一个元素为优先级最大的
                if (priority <= elem.priority) {
                    this._queue.splice(index, 0, element);
                    break;
                }
                // 遍历到最后一个元素
                if (index === this._queue.length - 1) {
                    this._queue.push(element); // 此处 push 后导致队列变长, 然后会继续循环
                    break;
                }
            }
        }
    }

    get length() {
        return this._queue.length;
    }

    /**
     * 从队列中删除并返回优先级最大的元素, 优先级相同采取 LILO 规则
     * 
     * @returns {Object} {item, priority}
     */
    pop() {
        return this._queue.pop()
    }

    isEmpty() {
        return this._queue.length === 0;
    }

    isFull() {
        if (this.maxsize === 0) return false;
        return this._queue.length === this.maxsize;
    }
}

module.exports = PriorityQueue;