const AWS = require("aws-sdk");
const fs = require('fs');
const connectDB = require('./_connectionDB');
const docClient = new AWS.DynamoDB.DocumentClient();
const params = {
    TableName: "Movies"
};
console.log("Scanning Movies table.");
function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        // print all the movies
        console.log("Scan succeeded.");
        data.Items.forEach(function(movie) {
           console.log(
                movie.year + ": ",
                movie.title, "- rating:", movie.info.rating);
        });
    }
}
docClient.scan(params, onScan);
