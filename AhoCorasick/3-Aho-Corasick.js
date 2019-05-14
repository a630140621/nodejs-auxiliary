// 多模式串匹配算法
// AC自动机
// npm install aho-corasick-node
// 无法获取标签词出现的次数
var AhoCorasick = require("aho-corasick-node");
const label_list = require("./test-label.json");

function build() {
    const builder = AhoCorasick.builder();
    label_list.forEach(k => builder.add(k));
    const ac = builder.build();
    
    return ac;
}


console.time("3-Aho-Corasick build time");
let ac = build();
console.timeEnd("3-Aho-Corasick build time");

exports.search = function (text) {
    let result = ac.match(text);
    // console.log(`3-Aho-Corasick length = ${result.length}`);
    return result;
};


if (!module.parent) {
    let content_list = require("./test-content.json");
    exports.search(content_list[0]);
}