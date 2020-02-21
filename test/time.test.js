const time = require("../lib/time");
const expect = require("chai").expect;


function print() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, 10);
    });
}

describe("time.test.js", async () => {
    it("function timeoutDecorator and expect not timeout", async () => {
        let printNoTimeout = time.timeoutDecorator(print, 11);
        expect(await printNoTimeout()).to.be.true;
    });


    it("function timeoutDecorator and expect timeout", async () => {
        let printWithTimeout = time.timeoutDecorator(print, 5);
        // expect(printWithTimeout).to.throw();
        try {
            await printWithTimeout();
        } catch (error) {
            expect(error).to.be.an("error");
        }
    });

    it("test delay(sleep) function without default value", async () => {
        let start = Date.now();
        await time.delay(10);
        expect(Date.now() - start).to.lt(14).and.gte(10);
    });
});