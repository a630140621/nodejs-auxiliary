// api参考文档
// http://mongodb.github.io/node-mongodb-native/3.1/api/
const MongoClient = require("mongodb").MongoClient;


exports.getMongoCollection = getMongoCollection;
exports.getDb = getDb;


let default_options = {
    poolSize: 5,
    useNewUrlParser: true,
    appname: "demo",
    connectTimeoutMS: 30000, // 连接超时时间
    reconnectTries: 60,
    reconnectInterval: 1000,
    useUnifiedTopology: true,
    // "auth.user": "",
    // "auth.password": "",
};

// 仅在第一次链接的时候创建连接池
let mongo_client = null;

/**
 * 获取指定 db 内的集合, 来执行后续 CURD 操作
 * @param {String} collection_name 集合名
 * @param {Object} options 数据库名 {db}
 */
async function getMongoCollection(collection_name, options = { db: "test" }) {
    let _db = await getDb(options);
    return _db.collection(collection_name);
}

async function getDb(options) {
    if (!mongo_client) {
        await MongoClient.connect("mongodb://localhost:27017", Object.assign(default_options), options);
    }

    return mongo_client.db(options["db"]);
}