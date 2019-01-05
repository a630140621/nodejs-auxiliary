const time = require('../lib/time');
const expect = require('chai').expect;


function printAfterFiveSec() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('five sec ago');
        }, 5000)
    })
}

describe('Test timeoutDecorator', async () => {
    it('timeoutDecorator', async () => {
        printAfterFiveSec = time.timeoutDecorator(printAfterFiveSec, 1000);
        try {
            await printAfterFiveSec();
        } catch (error) {
            expect(error).to.be.an('error');
        }
    });
})