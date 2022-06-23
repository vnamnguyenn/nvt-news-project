const {docClient} = require(`../../config/dynamoDB`);
const crypto = require('crypto');
const uniqid = require('uniqid');
const userRepository = require('../users/userRepository');
const {currentTime} = require('../../config/currentTime');
class AuthRepository {
	constructor() {
		this.tableName = 'Blog';
	}

	async updateByID(pk, data) {
		const getUserInfo = await userRepository.findByID(pk);
		const params = {
			TableName: this.tableName,
			Key: {
				PK: pk,
				SK: pk,
			},
			UpdateExpression: 'SET #11740 = :11740, #11741 = :11741',
			ExpressionAttributeValues: {
				':11740': data.FullName,
				':11741': data.Avatar == '' ? getUserInfo.Item.Avatar : data.Avatar,
			},
			ExpressionAttributeNames: {
				'#11740': 'FullName',
				'#11741': 'Avatar',
			},
			ReturnValues: `UPDATED_NEW`,
		};

		const update = await docClient.update(params).promise();

		return update.Attributes;
	}

	async signup(data) {
		const accountId = uniqid('u');
		const hashedPassword = crypto
			.createHmac('sha512', process.env.PASS_SECRET)
			.update(data.PasswordHash)
			.digest('hex');
		const today = new Date();
		const params = {
			TableName: this.tableName,
			Item: {
				AccountId: accountId,
				UserEmail: data.UserEmail,
				PK: 'ACCT_' + accountId,
				SK: 'ACCT_' + accountId,
				FullName: data.FullName,
				Gender: 'Others',
				DateOfBirth: data.DateOfBirth,
				isAdmin: true,
				PasswordHash: hashedPassword,
				IsActive: true,
				Gender: data.Gender,
				Avatar: data.Gender === 'female' ? 'woman.png' : 'man.png',
				Description: data.Description,
				CreatedDate: currentTime + ' ' + new Date().toLocaleTimeString('vi-VN'),
			},
		};

		await docClient.put(params).promise();
		return params.Item;
	}

	async signin(data) {
		const hashedPassword = crypto
			.createHmac('sha512', process.env.PASS_SECRET)
			.update(data.PasswordHash)
			.digest('hex');

		const params = {
			TableName: this.tableName,
			IndexName: 'AccountIndex',
			KeyConditionExpression: '#ae300 = :ae300',
			FilterExpression: '#ae301 = :ae301',
			ExpressionAttributeValues: {
				':ae300': data.UserEmail,
				':ae301': hashedPassword,
			},
			ExpressionAttributeNames: {
				'#ae300': 'UserEmail',
				'#ae301': 'PasswordHash',
			},
		};

		return await docClient.query(params).promise();
	}
}

module.exports = new AuthRepository();
