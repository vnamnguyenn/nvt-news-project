const db = require(`../../config/dynamoDB`);

class UserRepository {
	constructor() {
		this.tableName = 'Blog';
	}

	async findByID(PK) {
		const params = {
			TableName: this.tableName,
			Key: {
				PK: PK,
				SK: PK,
			},
		};

		return await db
			.get(params, function (err, data) {
				if (err) {
					console.error('Unable to read item. Error JSON:', JSON.stringify(err, null, 2));
				} else {
					console.log('GetItem succeeded:', JSON.stringify(data, null, 2));
				}
			})
			.promise();
	}

	async getAll() {
		const params = {
			TableName: this.tableName,
			IndexName: 'AccountIndex',
		};
		return await db.scan(params).promise();
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

		await db.put(params).promise();

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

		const update = await db.update(params).promise();

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

		return await db.delete(params).promise();
	}
}

module.exports = new UserRepository();
