const crypto = require('crypto');

exports.md5 = function (s) {
    return crypto.createHash('md5').update(s).digest('hex');
}