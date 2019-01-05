const elasticsearch = require('elasticsearch');

exports.client = new elasticsearch.Client({
    "host": "tree:9200",
    "log": "warning",
    "apiVersion": "5.6",
    "requestTimeout": 5000
});