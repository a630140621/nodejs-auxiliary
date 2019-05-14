// 多模式串匹配算法
// AC自动机
// npm install aho-corasick-search
var AhoCorasick = require("aho-corasick-search");
const label_list = require("./test-label.json");

function build() {
    var ac = new AhoCorasick();
    for (let label of label_list) {
        ac.add(label);
    }
    ac.build();
    
    return ac;
}


console.time("2-Aho-Corasick build time");
let ac = build();
console.timeEnd("2-Aho-Corasick build time");

exports.search = function (text) {
    let result = ac.search(text);
    // console.log(`2-Aho-Corasick length = ${result.length}`);
    return result;
};


if (!module.parent) {
    let content_list = require("./test-content.json");
    exports.search(content_list[0]);
}