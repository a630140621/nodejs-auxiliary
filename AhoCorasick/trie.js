// Trie 树
const Trie = require("./MyAC/Trie");
const label_list = require("./test-label.json");

function build() {
    let trie = new Trie();
    label_list.forEach(k => trie.add(k));
    
    return trie;
}


console.time("trie build time");
let trie = build();
console.timeEnd("trie build time");

exports.search = function (text) {
    let result = trie.search(text);
    // console.log(`trie length = ${result.length}`);
    return result;
};


if (!module.parent) {
    let content_list = require("./test-content.json");
    exports.search(content_list[0]);
}
