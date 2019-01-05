const getLogger = require('../lib/logging').getLogger;
require('chai').should();


describe('logging', () => {
    it('logging.getLogger', () => {
        let foo_logger_1 = getLogger('foo');
        let foo_logger_2 = getLogger('foo');
        let bar_logger = getLogger('bar');

        foo_logger_1.should.be.equal(foo_logger_2);
        foo_logger_1.should.not.be.equal(bar_logger);
        foo_logger_2.should.not.be.equal(bar_logger);
    })
})