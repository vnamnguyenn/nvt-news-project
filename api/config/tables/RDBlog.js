const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION,
  endpoint: process.env.AWS_END_POINT_DDB_CONSOLE,
});

var dynamoDB = new AWS.DynamoDB();

function createTable() {
    const params = {
      TableName: "Movies",
      KeySchema: [{ AttributeName: "title", KeyType: "HASH" }],
      AttributeDefinitions: [{ AttributeName: "title", AttributeType: "S" }],
      ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10,
      },
    };
  
    dynamoDB.createTable(params, function(err, data) {
      if (err) {
        console.error("Unable to create table", err);
      } else {
        console.log("Created table", data);
      }
    });
  }

  createTable();