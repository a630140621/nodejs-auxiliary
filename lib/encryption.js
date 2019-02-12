const crypto = require("crypto");

exports.md5 = function (s) {
    return crypto.createHash("md5").update(s).digest("hex");
};


exports.base62 = {
    charset: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    encode: int => {
        if (int === 0) return "0";
        let s = [];
        while (int > 0) {
            s.unshift(this.base62.charset.charAt(int % 62));
            int = Math.floor(int / 62);
        }

        return s.join("");
    },
    decode: string => {
        let res = 0;
        let char_list = string.split("").reverse();
        for (let [i, char] of char_list.entries()) {
            let char_code = this.base62.charset.indexOf(char);
            res += char_code * (62 ** i);
        }

        return res;
    }
};