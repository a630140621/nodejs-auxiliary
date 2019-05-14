// 多模式串匹配算法
// AC自动机
// npm install aho-corasick2
const AhoCorasick = require("aho-corasick2");
const label_list = require("./test-label.json");


function build() {
    let ac = new AhoCorasick();
    label_list.forEach(word => ac.add(word, {word}));

    ac.build_fail();
    return ac;
}


console.time("1-Aho-Corasick build time");
let ac = build();
console.timeEnd("1-Aho-Corasick build time");

exports.search = function (text) {
    let result = ac.search(text);
    // console.log(`1-Aho-Corasick length = ${Object.keys(result.count).length}`);
    // console.log(result.count);
    return result.count;
};

if (!module.parent) {
    let content_list = require("./test-content.json");
    exports.search(content_list[0]);
}