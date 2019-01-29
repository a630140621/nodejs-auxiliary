// 以下为三个参考链接
// https://github.com/bestiejs/benchmark.js
// https://benchmarkjs.com/docs#prototype_run
// https://github.com/invertase/denque/blob/master/benchmark/thousand.js

const Benchmark = require("benchmark");
const suite = new Benchmark.Suite;

// add tests
suite
    .add("RegExp#test", function () {
        /o/.test("Hello World!");
    })
    .add("String#indexOf", function () {
        "Hello World!".indexOf("o") > -1;
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