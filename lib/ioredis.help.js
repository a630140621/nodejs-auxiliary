const Redis = require("ioredis");


// 一个 db 只建立一条连接
let _store = {};
const CONFIG = {
    host: "127.0.0.1",
    port: 6379,
    // 普通模式下连接 redis 重连策略
    // times: 重连次数
    retryStrategy: function (times) {
        var delay = Math.min(times * 200, 2000);
        return delay;
    },
    // sentinel 模式
    // sentinelRetryStrategy: function (times) {
    //     var delay = Math.min(times * 200, 2000);
    //     return delay;
    // },
    // cluster 模式下 redis 重连策略
    // clusterRetryStrategy: function (times) {
    //     var delay = Math.min(times * 200, 2000);
    //     return delay;
    // }
};
exports.getRedisClient = function (db_number) {
    if (_store[db_number]) return _store[db_number];

    let _options = Object.assign(CONFIG, {
        db: db_number
    });
    let redis = new Redis(_options);

    redis.on("connect", () => {
        console.log(`redis has connected`);
    });

    redis.on("error", error => {
        console.error(`redis occur some error = ${error}`);
    });

    redis.on("close", () => {
        console.log(`redis connect is closed`);
    });

    redis.on("reconnecting", () => {
        console.info(`redis connect is closed try reconnecting redis`);
    });

    redis.on("select", number => {
        console.log(`select new db ${number}`);
    });

    _store[db_number] = redis;
    return _store[db_number];
};

// exports.pipeline = redis.pipeline;