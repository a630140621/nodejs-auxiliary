// api参考文档
// http://mongodb.github.io/node-mongodb-native/3.1/api/
const mongodb = require("mongodb");


exports.getMongoCollection = getMongoCollection;


let default_options = {
    poolSize: 5,
    useNewUrlParser: true,
    appname: "demo",
    connectTimeoutMS: 30000, // 连接超时时间
    reconnectTries: 60,
    reconnectInterval: 1000,
    // "auth.user": "",
    // "auth.password": "",
};

// 仅在第一次链接的时候创建连接池
let mongo_client = null;

/**
 * 获取指定 db 内的集合, 来执行后续 CURD 操作
 * @param {String} collection_name 集合名
 * @param {String} db 数据库名
 */
async function getMongoCollection(collection_name, options = { db: "test" }) {
    if (!mongo_client) {
        mongo_client = new mongodb.MongoClient("mongodb://localhost:27017", Object.assign(default_options), options);
        await mongo_client.connect();
    }
    let _db = mongo_client.db(options["db"]);

    return _db.collection(collection_name);
}

