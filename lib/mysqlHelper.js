// 文档参考地址
// https://www.npmjs.com/package/mysql
const mysql = require("mysql");


const pool = mysql.createPool({
    "host": "kind",
    "database": "news_cfg",
    "user": "news",
    "password": "pwd@news$",
    "connectionLimit": 10,
    // "charset": "utf8mb4" // 如果有 emoji 表情, 如果存不进去需要设置 charset
});

/**
 * @params {String} sql
 * @params {Array|Object} values
 * 
 * eg1.
 * let sql = 'SELECT 1 + 1 AS solution';
 * let result = await execute(sql);
 * 
 * eg2.
 * let post  = {id: 1, title: 'Hello MySQL'};
 * await execute('INSERT INTO posts SET ?', post);
 */
exports.execute = function (sql, sql_params = []) {
    let _sql = `-- caimi-cms\n${sql}`;

    return new Promise((resolve, reject) => {
        pool.query(_sql, sql_params, (error, results, fields) => {
            if (error) {
                console.error(`execute sql: ${mysql.format(sql, sql_params)}`);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};