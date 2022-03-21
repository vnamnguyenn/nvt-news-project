const AWS = require("aws-sdk");
const fs = require('fs');
const connectDB = require('./_connectionDB');
const docClient = new AWS.DynamoDB.DocumentClient();
console.log("Querying for movies from 1985.");
const params = {
    TableName : "Blog",
    KeyConditionExpression: "#yr = :yyyy",
    ExpressionAttributeNames:{
        "#yr": "year"
    },
    ExpressionAttributeValues: {
        ":yyyy": 1985
    }
};

docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log(" -", item.year + ": " + item.title);
        });
    }
});
