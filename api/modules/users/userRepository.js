const {docClient} = require(`../../config/dynamoDB`);

class UserRepository {
	constructor() {
		this.tableName = 'Blog';
	}

	async findByEmail(email) {
		const params = {
			TableName: this.tableName,
			IndexName: 'AccountIndex',
			KeyConditionExpression: '#85e30 = :85e30',
			ExpressionAttributeValues: {
				':85e30': email,
			},
			ExpressionAttributeNames: {
				'#85e30': 'UserEmail',
			},
		};

		return await docClient.query(params).promise();
	}

	async findByID(PK) {
		const params = {
			TableName: this.tableName,
			Key: {
				PK: PK,
				SK: PK,
			},
		};

		return await docClient.get(params).promise();
	}

	async getAll() {
		const params = {
			TableName: this.tableName,
			IndexName: 'AccountIndex',
		};
		return await docClient.scan(params).promise();
	}

	async create(data) {
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
				PasswordHash: '22',
				IsActive: data.IsActive,
				Avatar: data.Avatar,
				Description: data.Description,
			},
		};

		await docClient.put(params).promise();

		return params.Item;
	}

	async update(PK, data) {
		const params = {
			TableName: this.tableName,
			Key: {
				PK: PK,
				SK: PK,
			},
			UpdateExpression: `set #Role = :Roles`,
			ExpressionAttributeNames: {
				'#Role': 'Role',
			},
			ExpressionAttributeValues: {
				':Roles': data.Role,
			},
			ReturnValues: `UPDATED_NEW`,
		};

		const update = await docClient.update(params).promise();

		return update.Attributes;
	}

	async deleteByID(PK) {
		const params = {
			TableName: this.tableName,
			Key: {
				PK: PK,
				SK: 'ACCT_p8d0rgh5kol1exfazh',
			},
		};

		return await docClient.delete(params).promise();
	}
}

module.exports = new UserRepository();
