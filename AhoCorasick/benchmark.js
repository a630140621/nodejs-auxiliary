let test_content_list = require("./test-content.json");
const Benchmark = require("benchmark");
const suite = new Benchmark.Suite;
let AC_1 = require("./1-Aho-Corasick");
let AC_2 = require("./2-Aho-Corasick");
let AC_3 = require("./3-Aho-Corasick");


suite
    .add("1-Aho-Corasick", function () {
        for (let content of test_content_list) {
            AC_1.search(content);
        }
    })
    .add("2-Aho-Corasick", function () {
        for (let content of test_content_list) {
            AC_2.search(content);
        }
    })
    .add("3-Aho-Corasick", function () {
        for (let content of test_content_list) {
            AC_3.search(content);
        }
    })
    // add listeners
    .on("cycle", function (event) {
        console.log(String(event.target));
    })
    .on("complete", function () {
        console.log("Fastest is " + this.filter("fastest").map("name"));
    })
    // run async
    .run();