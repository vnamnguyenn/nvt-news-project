const AWS = require("aws-sdk");
const fs = require('fs');
AWS.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_DEFAULT_REGION,
	endpoint: process.env.AWS_END_POINT,
});
const docClient = new AWS.DynamoDB.DocumentClient();
const table = "Blog";
const PK = "ACCT#user@gmail.com";
const SK = "ACCT#user@gmail.com";
const params = {
    TableName:table,
    Key:{
        "PK": PK,
        "SK": PK
    }
};

docClient.get(params, function(err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
    }
});