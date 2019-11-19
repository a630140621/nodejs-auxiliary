// 文档: https://kafka.js.org/docs/introduction
const Kafka = require("kafkajs").Kafka;
const CompressionTypes = require("kafkajs").CompressionTypes;
const os = require("os");
const settings = {
    host: "127.0.0.1",
    port: 9092
};


/**
 * Usage:
 *  let onsumer = await kafkaConsumer("input-news", group_id, 20);
 *  consumer.consume(async (topic, value, message) => { // value: 发送出去的对象, message: kafka 原生对象
 *      
 *  })
 */
exports.kafkaConsumer = async function (topics = ["input-news"], group_id = "radar", max_concurrent = 20) {
    let _topics = topics;
    if (typeof topics === "string") _topics = [topics];

    const kafka = new Kafka({
        clientId: `${os.hostname}:kafkajs-consumer:pid-${process.pid}`,
        brokers: [`${settings.host}:${settings.port}`],
        connectionTimeout: 2000,
        requestTimeout: 30000,
        retry: {
            maxRetryTime: 30000, // Maximum wait time for a retry in milliseconds
            initialRetryTime: 300, // Initial value used to calculate the retry in milliseconds (This is still randomized following the randomization factor)	
            factor: 0.2, // Randomization factor
            multiplier: 2, // Exponential factor
            retries: 5, // Max number of retries per call
            maxInFlightRequests: 50 // Max number of requests that may be in progress at any time. If falsey then no limit.
        }
    });

    const consumer = kafka.consumer({
        groupId: group_id,
        sessionTimeout: 30000, // 与 rebalance 相关
        heartbeatInterval: 3000, // Heartbeats are used to ensure that the consumer's session stays active. The value must be set lower than session timeout
    });

    await consumer.connect();
    // Subscribe can be called several times, 订阅多个topic时使用
    await Promise.all(_topics.map(topic => consumer.subscribe({
        topic
        // fromBeginning: true
    })));

    return {
        consume: async function (callback) {
            let _concurrent = 0; // 当前正在程序中消费的条数
            setInterval(() => { // 周期性查看当前正在消费的数量
                console.debug(`program current consume message count = ${_concurrent}`);
            }, 10000);
            await consumer.run({
                autoCommit: false,
                autoCommitInterval: 5000,
                // autoCommitThreshold: The consumer will commit offsets after resolving a given number of messages, for example, a hundred messages. Default: null
                // autoCommitThreshold: 10,
                eachBatch: async ({
                    batch,
                    resolveOffset,
                    heartbeat,
                    isRunning,
                    isStale
                }) => {
                    console.log(`receive batch kafka message count = ${batch.messages.length}`);
                    let i = 0;
                    while (i < batch.messages.length) {
                        if (!isRunning() || isStale()) break;
                        if (_concurrent < max_concurrent) {
                            // 控制并发数
                            _concurrent += 1;
                            console.log(`now _concurrent = ${_concurrent} kafka offset = ${batch.messages[i].offset}`);
                            if (_concurrent >= max_concurrent) {
                                consumer.pause(_topics.map(topic => ({
                                    topic
                                })));
                            }
                            await callback(batch.topic, JSON.parse(batch.messages[i].value.toString()), batch.messages[i]);
                            await resolveOffset(batch.messages[i].offset);
                            _concurrent -= 1;
                            await heartbeat();
                            i += 1;
                        }
                    }

                    consumer.resume(_topics.map(topic => ({
                        topic
                    })));
                },
                // eachMessage: async ({
                //     topic,
                //     partition,
                //     message
                // }) => {
                //     const prefix = `1 --------> ${topic} [${partition}|${message.offset}] / ${message.timestamp}`;
                //     console.log(`- ${prefix} ${message.key} ${message.value}`);
                // },
            });
        }
    };
};


/**
 * Usage:
 *  let kafka_producer_client = await getKafkaProducerClient();
 *  await kafka_producer_client.send("input-news", { title: "demo" });
 */
exports.getKafkaProducerClient = async function () {
    const kafka = new Kafka({
        clientId: `${os.hostname}:kafkajs-producer:pid-${process.pid}`,
        brokers: [`${settings.host}:${settings.port}`],
    });

    const producer = kafka.producer();
    await producer.connect();


    async function send(topic, message) {
        let _message = message;
        if (typeof message === "object") _message = JSON.stringify(_message);

        await producer.send({
            topic: topic,
            acks: 1,
            compression: CompressionTypes.GZIP,
            messages: [{
                value: _message
            }],
        });
    }

    return {
        send
    };
    // await producer.disconnect();
};