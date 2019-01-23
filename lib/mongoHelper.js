// api参考文档
// http://mongodb.github.io/node-mongodb-native/3.1/api/
const mongodb = require('mongodb');


exports.getMongoCollection = getMongoCollection;


let default_options = {
    poolSize: 5,
    useNewUrlParser: true
}

// 仅在第一次链接的时候创建连接池
let is_connect = false;
/**
 * 获取指定 db 内的集合, 来执行后续 CURD 操作
 * @param {String} collection_name 集合名
 * @param {String} db 数据库名
 */
async function getMongoCollection(collection_name, options = { db: "test" }) {
    if (!is_connect) {
        let mongo_client = new mongodb.MongoClient("mongodb://localhost:27017", Object.assign(default_options), options);
        await mongo_client.connect();
        is_connect = true;
    }
    let _db = mongo_client.db(db);

    _db.on(`error`, error => {
        logger.error(`an error occurred against a single server or mongos proxy error = ${error}`);
    });
    _db.on(`close`, _ => {
        logger.warn(`mongoDB connect have been closed`);
    });
    _db.on(`reconnect`, () => {
        logger.info(`reconnect mongoDB success`);
    });
    _db.on(`timeout`, _ => {
        logger.warn(`a socket timeout occurred against a single server or mongos proxy`);
    });
    return _db.collection(collection_name);
}

