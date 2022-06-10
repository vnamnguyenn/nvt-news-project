const AWS = require('aws-sdk');
var fs = require('fs');
require('dotenv').config();

AWS.config.update({
	accessKeyId: 'AKIAV2ETM6QXC3DCEXPC',
	secretAccessKey: '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',
	region: 'ap-southeast-1',
	endpoint: 'dynamodb.ap-southeast-1.amazonaws.com',
});

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
	TableName: 'Blog',
};
let table = [];
function onScan(err, data) {
	if (err) {
		console.error('Unable to scan the table. Error JSON:', JSON.stringify(err, null, 2));
	} else {
		const content = JSON.stringify(data.Items);
		fs.writeFile(__dirname + '/BlogData.json', content, (err) => {
			if (err) {
				console.error(err);
			}
			console.log('Export Data in successfully.');
		});
	}
}

docClient.scan(params, onScan);
