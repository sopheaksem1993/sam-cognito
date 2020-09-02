if(!process.env.AWS_REGION) {
    process.env.AWS_REGION = 'us-east-2';
}

if(!process.env.DYNAMODB_NAMESPACE) {
    process.env.DYNAMODB_NAMESPACE = 'dev';
}

const AWS = require('aws-sdk');
const DocumentClient = new AWS.DynamoDB.DocumentClient();

module.exports = {

    async ping() {
        return sendResponse({
            pong: new Date(),
            AWS_REGION: process.env.AWS_REGION,
            DYNAMODB_NAMESPACE: process.env.DYNAMODB_NAMESPACE,
        })
    },

    getTableName(tblSuffix) {
        return `acdl-${process.env.DYNAMODB_NAMESPACE}-${tblSuffix}`
    },

    DocumentClient,

    sendResponse,
};


function sendResponse(res, statusCode = 200) {
    let body;
    if(statusCode === 200) {
        body = JSON.stringify(res, null, 2)
    } else {
        body = JSON.stringify({errors: {body: [res]}}, null, 2)
    }
    return {
        statusCode,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body,
    }
}
