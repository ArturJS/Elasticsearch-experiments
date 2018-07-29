const elasticsearch = require('elasticsearch');
const connectionClass = require('http-aws-es');

const {
    AWS_ELASTICSEARCH_HOST,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY
} = process.env;

module.exports = new elasticsearch.Client({
    // host: 'localhost:9200',
    host: AWS_ELASTICSEARCH_HOST,
    log: 'info',
    connectionClass,
    awsConfig: {
        region: 'us-east-2',
        getCredentials: callback =>
            callback(null, {
                accessKey: AWS_ACCESS_KEY_ID,
                secretKey: AWS_SECRET_ACCESS_KEY
            })
    },
    httpOptions: {}
});
