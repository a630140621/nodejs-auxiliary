const winston = require("winston");
const path = require("path");
const fs = require("fs");
const lodash = require("lodash");


/**
 * 获取日志对象, 如果 名称相同则获取同一个日志对象
 */
exports.getLogger = lodash.memoize(getLogger);


const DIRNAME = path.join(__dirname, "../logs/");
function getLogger(name) {
    // 自动创建 logs/
    if (!fs.existsSync(DIRNAME)) fs.mkdirSync(DIRNAME);
    const logger = winston.createLogger({
        format: winston.format.combine(
            // winston.format.label({label: process.pid}),
            winston.format.timestamp(),
            winston.format.json()
        ),
        transports: [
            // - Write all logs error (and below) to `${name}.error.log`.
            new winston.transports.File({
                filename: path.join(DIRNAME, `${name}.error.log`),
                level: "error"
            }),
            // - Write all logs debug (and below) to `${name}.log`.
            new winston.transports.File({
                filename: path.join(DIRNAME, `${name}.log`),
                level: "debug"
            })
        ],
        exceptionHandlers: [
            new winston.transports.File({
                filename: path.join(DIRNAME, `${name}.exceptions.log`),
            })
        ],
        exitOnError: process.env.NODE_ENV === "production" ? false : true
    });

    // If not in production then log to the `console` with the format:
    if (process.env.NODE_ENV !== "production") {
        logger.add(new winston.transports.Console({
            handleExceptions: true,
            level: "debug",
            format: winston.format.combine(
                winston.format.colorize(),
                _consoleFormat
            )
        }));
    }

    return logger;
}

const _consoleFormat = winston.format.printf(info => {
    return `${info.timestamp} [${info.level}]: ${info.message}`;
});