const Benchmark = require("benchmark");
const suite = new Benchmark.Suite;
const uuidv1 = require("uuid/v1");
const uuidv3 = require("uuid/v3");
const uuidv4 = require("uuid/v4");
const uuidv5 = require("uuid/v5");
const simpleUUID = require("../lib/uuid");


suite
    .add("uuidv1", function () {
        uuidv1();
    })
    .add("uuidv3.DNS", function () {
        uuidv3("www.baidu.com", uuidv3.DNS);
    })
    .add("uuidv3.URL", function () {
        uuidv3("http://www.baidu.com", uuidv3.URL);
    })
    .add("uuidv4", function () {
        uuidv4();
    })
    .add("uuidv5.DNS", function () {
        uuidv5("www.baidu.com", uuidv5.DNS);
    })
    .add("uuidv5.URL", function () {
        uuidv5("http://www.baidu.com", uuidv5.URL);
    })
    .add("simpleUUID", function () {
        simpleUUID();
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

// logs:
// => RegExp#test x 4,161,532 +-0.99% (59 cycles)
// => String#indexOf x 6,139,623 +-1.00% (131 cycles)
// => Fastest is String#indexOf