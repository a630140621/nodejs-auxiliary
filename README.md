# js-auxiliary

## extend

在　`Object`, `Array`, `Date` 的原型对象上增加一些额外的函数

> 使用了 lodash

## lib

维护一些常用的函数

* elasticsearchHelper.js: 连接es, 目前未使用连接池
* encryption.js: 常用加密/摘要函数(md5)
* logging.js: 使用　winston 封装的日志模块, 同一个名字返回同一个实例
* ioredisHelper.js: 连接 redis
* mongoHelper.js: 连接 mongodb
* mysqlHelper.js: 连接 mysql
* promisify.js: 将标准回调式函数转化为 Promise 函数
* time.js: 提供类似 python 的 sleep() 函数和 __超时包装函数__