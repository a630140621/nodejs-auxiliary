const time = require("../lib/time");
const expect = require("chai").expect;


function printAfterFiveSec() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("five sec ago");
        }, 500);
    });
}

describe("Test timeoutDecorator", async () => {
    it("timeoutDecorator", async () => {
        printAfterFiveSec = time.timeoutDecorator(printAfterFiveSec, 100);
        try {
            let ret = await printAfterFiveSec();
            expect(ret).to.be.equal("five sec ago");
        } catch (error) {
            expect(error).to.be.an("error");
        }
    });
});