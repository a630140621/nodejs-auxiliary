const assert = require("assert");


class Node {
    constructor(value, parent_node = null) {
        if (parent_node) assert(parent_node instanceof Node);
        this.parent_node = parent_node;
        this.value = value;
        this._childs = {};
        this._is_word_end = false;
    }

    setChildNodeByValue(value) {
        if (!this._childs[value]) this._childs[value] = new Node(value, this);
    }

    getChildNodeByValue(value) {
        return this._childs[value];
    }

    get is_word_end() {
        return this._is_word_end || this.is_leaf;
    }

    set is_word_end(boolean = true) {
        this._is_word_end = boolean;
    }

    get is_leaf() {
        return Object.keys(this._childs).length === 0;
    }
}

class Trie {
    constructor() {
        this._root = new Node("root");
    }

    add(words) {
        let len = words.length;
        let current_node = this._root;
        for (let i = 0; i < len; i++) {
            let child_node = current_node.getChildNodeByValue(words[i]);
            if (child_node) {
                current_node = child_node;
            } else {
                current_node.setChildNodeByValue(words[i]);
                current_node = current_node.getChildNodeByValue(words[i]);
            }

            if (i === len - 1) {
                current_node.is_word_end = true;
                continue;
            }
        }
    }

    search(text) {
        let len = text.length;
        let skip = 1;
        let ret = [];
        let index = 0;
        let words_offset = 0;

        let words = "";
        let current_node = this._root;
        while (index <= len) {
            if (!text[index + words_offset]) break;
            let child_node = current_node.getChildNodeByValue(text[index + words_offset]);

            if (!child_node) { // 节点不存在
                index += skip;
                words_offset = 0;
                current_node = this._root;
                words = "";
            } else { // 子节点存在
                current_node = child_node;
                words += current_node.value;
                words_offset += 1;
                if (current_node.is_word_end) { // 当前节点是字母结尾
                    ret.push(words);
                }

                if (current_node.is_leaf) { // 叶子节点
                    index += skip;
                    words_offset = 0;
                    current_node = this._root;
                    words = "";
                }
            }
        }

        return ret;
    }
}

module.exports = Trie;


if (!module.parent) {
    let trie = new Trie();
    ["say", "she", "shr", "he", "her", "h", "hers", "his"].forEach(words => trie.add(words));
    let result = trie.search("yasherhs");
}