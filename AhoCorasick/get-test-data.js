// 获取训练数据
const execSql = require("../lib/mysqlHelper").execute;
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");


/**
 * 拉取库中的所有label作为test label
 */
// const BATCH_SIZE = 10000;
// let BATCH = 1;
// let loop = true;

// (async () => {
//     let data = [];
//     while (loop) {
//         let result = await execSql(`select label_normalized AS label from fe_content_label limit ${BATCH_SIZE} offset ${(BATCH - 1) * BATCH_SIZE}`);

//         for (let each of result) {
//             if (each.label) data.push(each.label);
//         }

//         if (result.length === 0) loop = false;
//         else BATCH += 1;
//         console.log(`current BATCH = ${BATCH}, BATCH_SIZE = ${BATCH_SIZE}, loop = ${loop}`);
//     }

//     let full_path = path.join(__dirname, "test-label.json");
//     fs.writeFileSync(full_path, JSON.stringify(data));
//     console.log("end");
//     process.exit();
// })();

/**
 * 获取库中 100 篇文章
 */
(async () => {
    let data = [];
    let result = await execSql("select content from fe_articles limit 100 offset 113430");

    for (let each of result) {
        if (each.content) {
            let content = cheerio.load(each.content);
            data.push(content.text());
        }
    }

    let full_path = path.join(__dirname, "test-content.json");
    fs.writeFileSync(full_path, JSON.stringify(data));
    console.log("end");
    process.exit();
})();