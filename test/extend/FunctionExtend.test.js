const expect = require("chai").expect;
require("../../extend/index");

describe("FunctionExtend", () => {
    it("$memoize", async () => {
        function a(timeout){ // 一个
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(Math.random());
                }, timeout);
            });
        }

        let a1 = await a(20);
        let a2 = await a(20);
        expect(a1).to.be.not.equal(a2);

        let b = a.$memoize();
        let b1 = b(20);
        let b2 = b(20);
        expect(b1).to.be.equal(b2);
    });

    it("$memoize with resolver", () => {
        function a(arg) {
            return arg;
        }
        let b = a.$memoize();
        let b1 = b(1);
        let b2 = b(2);
        expect(b1).not.equal(b2);

        let c = a.$memoize(() => "1");
        let c1 = c(1);
        let c2 = c(2);
        expect(c1).equal(c2);
    });
});