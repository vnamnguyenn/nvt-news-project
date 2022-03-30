const db = require(`../../config/dynamoDB`);
const crypto = require('crypto');

class AuthRepository {
	constructor() {
		this.tableName = 'Blog';
	}

	async signup(data) {
		// const lengthSalt = 16;
		// const salt = crypto
		// 	.randomBytes(Math.ceil(lengthSalt / 2))
		// 	.toString('hex')
		// 	.slice(0, lengthSalt);
		const secret = 'nvtnews';
		const hashedPassword = crypto.createHmac('sha512', secret).update(data.PasswordHash).digest('hex');

		const params = {
			TableName: this.tableName,
			Item: {
				UserEmail: data.UserEmail,
				PK: 'ACCT_' + data.UserEmail,
				SK: 'ACCT_' + data.UserEmail,
				AccountIndexId: 'ACCT_' + data.UserEmail,
				FullName: data.FullName,
				PhoneNumber: data.PhoneNumber,
				Gender: data.Gender,
				DateOfBirth: data.DateOfBirth,
				Role: data.Role,
				PasswordHash: hashedPassword,
				IsActive: data.IsActive,
				Avatar: data.Avatar,
				Description: data.Description,
			},
		};

		await db.put(params).promise();
		return params.Item;
	}

	async signin(data) {
		const accountIndexId = 'ACCT_' + data.UserEmail;
		const secret = 'nvtnews';
		const hashedPassword = crypto.createHmac('sha512', secret).update(data.PasswordHash).digest('hex');

		const params = {
			TableName: this.tableName,
			IndexName: 'AccountIndex',
			KeyConditionExpression: '#ae300 = :ae300',
			FilterExpression: '#ae301 = :ae301',
			ExpressionAttributeValues: {
				':ae300': accountIndexId,
				':ae301': hashedPassword,
			},
			ExpressionAttributeNames: {
				'#ae300': 'AccountIndexId',
				'#ae301': 'PasswordHash',
			},
		};

		return await db.query(params).promise();
	}
}

module.exports = new AuthRepository();
