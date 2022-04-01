const db = require(`../../config/dynamoDB`);
const uniqid = require('uniqid');
class CategoryRepository {
	constructor() {
		this.tableName = 'Blog';
	}

	async findByID(id) {
		const params = {
			TableName: this.tableName,
			IndexName: 'CategoryIndex',
			KeyConditionExpression: '#38cd0 = :38cd0',
			ExpressionAttributeValues: {
				':38cd0': id,
			},
			ExpressionAttributeNames: {
				'#38cd0': 'CategoryId',
			},
		};

		return await db.query(params).promise();
	}

	async getAll() {
		const params = {
			TableName: this.tableName,
			IndexName: 'CategoryIndex',
		};
		return await db.scan(params).promise();
	}

	async create(data) {
		let id = uniqid('c');
		const params = {
			TableName: this.tableName,
			Item: {
				CategoryId: id,
				PK: 'ACCT_115',
				SK: 'CAT_' + id,
				Slug:data.Slug,
				CategoryName: data.CategoryName,
				Thumbnail: data.Thumbnail,
				CreatedBy: data.CreatedBy,
				UpdatedBy: data.UpdatedBy,
				CreatedDate: data.CreatedDate,
				UpdatedDate: data.UpdatedDate,
			},
		};

		await db.put(params, function (err, data) {
			if (err) {
				console.error('Something went wrong:', JSON.stringify(err, null, 2));
			} else {
				console.log('Create is success:', JSON.stringify(data, null, 2));
			}
		}).promise();

		return params.Item;
	}

	async update(data) {
		const params = {
			TableName: this.tableName,
			Key: {
				PK: 'ACCT_115',
				SK: 'POST_8d0rgh66sl1dyvrufp8d0rgh66sl1dyvrue',
			},
			UpdateExpression: 'SET #1be70 = :1be70, #1be71 = :1be71, #1be72 = :1be72, #1be73 = :1be73, #1be74 = :1be74, #1be75 = :1be75',
			ExpressionAttributeValues: {
				':1be70': data.Content,
				':1be71': data.PostImage,
				':1be72': data.Thumbnail,
				':1be73': data.ReadingTime,
				':1be74': data.Published,
				':1be75': data.PostTitle,
			},
			ExpressionAttributeNames: {
				'#1be70': 'Content',
				'#1be71': 'PostImage',
				'#1be72': 'Thumbnail',
				'#1be73': 'ReadingTime',
				'#1be74': 'Published',
				'#1be75': 'PostTitle',
			},
			ReturnValues: `UPDATED_NEW`,
		};

		const update = await db.update(params).promise();

		return update.Attributes;
	}

	async deleteByID(id) {
		const params = {
			TableName: this.tableName,
			Key: {
				PK: id,
				SK: 'POST_p8d0rghcvkl1dwokrv',
			},
		};

		return await db.delete(params).promise();
	}
}

module.exports = new CategoryRepository();
