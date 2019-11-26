// nodejs + redis 不需要使用连接池, 详细解释见下文
// http://www.cnblogs.com/laozhbook/p/nodejs_redis_connection_pool.html?utm_source=tuicool&utm_medium=referral
// redis 命令参考
// https://redis.io/commands
// redis 模块参考
// https://www.npmjs.com/package/redis
const redis = require("redis");
const promisifyAll = require("./promisify").promisifyAll;


exports.getRedisClient = getRedisClient;

const CONFIG = {
    "host": "localhost",
    "port": 6379
};

let _store = {};

/**
 * 连接 redis, 返回 redisClient
 * 指定相同的 host + db 则返回同一个 client
 * @param {Number} db 
 * @param {*} options {host: settings.redis.host, port: settings.redis.port}
 */
function getRedisClient(db = 0, options) {
    let _options = Object.assign(CONFIG, options, {
        db
    });

    // 缓存键
    let key = `${_options.host}-${_options.db}`;
    if (_store[key]) return _store[key];

    let client = redis.createClient(_options);
    // 统计重连次数, 连上之后会自动刷新
    let reconnect_number = 0;
    client.on("ready", () => {
        console.log(`redis connect is established`);
        reconnect_number = 0;
    });

    client.on("reconnecting", () => {
        console.warn(`try to reconnect redis number = ${++reconnect_number}`);
    });

    client.on("end", () => {
        console.warn(`redis server connection has closed`);
    });

    client.on("error", error => {
        console.error(`connect redis server error = ${error}`);
    });

    // 缓存
    _store[key] = client;
    return promisifyAll(client);
}