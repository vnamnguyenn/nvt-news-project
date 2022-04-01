const db = require(`../../config/dynamoDB`);
const crypto = require('crypto');
const uniqid = require('uniqid');
class AuthRepository {
	constructor() {
		this.tableName = 'Blog';
	}

	async signup(data) {
		const accountId = uniqid('u');
		const hashedPassword = crypto.createHmac('sha512', process.env.PASS_SECRET).update(data.PasswordHash).digest('hex');
		const today = new Date();
		const currentTime = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
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
				isAdmin: false,
				PasswordHash: hashedPassword,
				IsActive: true,
				Avatar: 'https://www.w3schools.com/howto/img_avatar.png',
				Description: data.Description,
				CreatedDate: currentTime,
			},
		};

		await db.put(params).promise();
		return params.Item;
	}

	async signin(data) {
		const hashedPassword = crypto.createHmac('sha512', process.env.PASS_SECRET).update(data.PasswordHash).digest('hex');

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

		return await db.query(params).promise();
	}
}

module.exports = new AuthRepository();
