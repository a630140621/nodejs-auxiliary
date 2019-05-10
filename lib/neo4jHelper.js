// api: https://neo4j.com/docs/api/javascript-driver/current/
// doc: https://neo4j.com/docs/driver-manual/1.7/
const neo4j = require("neo4j-driver").v1;

const URI = "bolt://localhost:7687";
const USER = "neo4j";
const PASSWORD = "123456";


// 可以手动 BEGIN, COMMIT and ROLLBACK
// 可以读写分离，但是需要调用不同函数
const driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD), {
    // maxConnectionLifetime: 1 * 60 * 60 * 1000, // default 1h, 实际回收的时机在该连接被调用的时候，而不是到时间就立即回收
    maxConnectionPoolSize: 50,
    connectionAcquisitionTimeout: 1 * 60 * 1000, // default 60 seconds // 当一个查询到来，且池中的连接被使用完时，如果该请求 60s 内没有获取到连接，则报 ClientException
    // maxTransactionRetryTime: 15 * 1000 // 15s 超过指定时间后，将不会在尝试重试
});

driver.onCompleted = function () {
    console.log("Driver created");
};

driver.onError = console.error;

/**
 * 执行 Cypher 语句，不会进行读写分离，可执行读写操作
 * @param {String} cypher 
 * @param {Object} params 
 * 
 * $var 为占位符
 * 
 * eg.
 * const cypher = "CREATE (a:Person {name: $name})";
 * const params = {
 *     "name": "demo"
 * }
 * 
 * await execute(cypher, params);
 */
exports.execute = async function (cypher, params = {}) {
    const session = driver.session(); // 从 pool 中获取连接进行后续执行
    let result = await session.writeTransaction(tx => tx.run(cypher, params));
    session.close(); // 释放 pool
    return result.records.map(record => record.toObject());
};


// 只读操作
exports.read = async function (cypher) {
    const session = driver.session(); // 从 pool 中获取连接进行后续执行
    let result = await session.readTransaction(tx => tx.run(cypher));
    session.close(); // 释放 pool
    return result.records.map(record => record.toObject());
};


if (!module.parent) {
    exports.execute("MATCH (n:Person) RETURN n, n.name AS name LIMIT 25").then(result => {
        console.log(JSON.stringify(result));
    }).catch(console.error);

    exports.execute("CREATE (a:Person {name: $name})", {name: "demo"}).then(result => {
        console.log(JSON.stringify(result));
    }).catch(console.error);

    exports.read("MATCH (n:Person) RETURN n LIMIT 25").then(result => {
        console.log(JSON.stringify(result));
    }).catch(console.error);
}


// session.run(); // 自动提交的 Transactions
// It is not recommended to use auto-commit transactions in production environments or when performance or resilience are a primary concern.

// const person_name = "Alice";
// session.run(
//     "CREATE (a:Person {name: $name}) RETURN a", {
//         name: person_name
//     }
// ).then(result => {
//     session.close();

//     const singleRecord = result.records[0];
//     const node = singleRecord.get(0);

//     console.log(node.properties.name);

//     // on application exit:
//     driver.close();
// }).catch(console.error);