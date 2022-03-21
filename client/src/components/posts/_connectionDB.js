const AWS = require("aws-sdk");
require("dotenv").config();
const db = AWS.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_DEFAULT_REGION,
	endpoint: process.env.AWS_END_POINT,
});
module.exports = db;
