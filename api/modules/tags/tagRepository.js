const db = require(`../../config/dynamoDB`);
const uniqid = require('uniqid');
const userRepository = require('../users/userRepository');
const currentTime = require('../../config/currentTime');
class TagRepository {
	constructor() {
		this.tableName = 'Blog';
	}

	async findByID(id) {
		const params = {
			TableName: this.tableName,
			IndexName: 'TagIndex',
			KeyConditionExpression: '#38cd0 = :38cd0',
			ExpressionAttributeValues: {
				':38cd0': id,
			},
			ExpressionAttributeNames: {
				'#38cd0': 'TagId',
			},
		};

		return await db.query(params).promise();
	}

	async getAll() {
		const params = {
			TableName: this.tableName,
			IndexName: 'TagIndex',
		};
		return await db.scan(params).promise();
	}

	async popularTag() {
		const params = {
			TableName: this.tableName,
			IndexName: 'TagIndex',
		};
		return await db.scan(params).promise();
	}

	async create(pk, data) {
		const getUserInfo = await userRepository.findByID(pk);
		let id = uniqid('t');
		const params = {
			TableName: this.tableName,
			Item: {
				TagId: id,
				PK: pk,
				SK: 'TAG_' + id,
				Slug: data.Slug,
				TagName: data.TagName,
				Thumbnail: data.Thumbnail,
				CreatedBy: getUserInfo.Item.FullName,
				CreatedDate: currentTime,
			},
		};

		await db
			.put(params, function (err, data) {
				if (err) {
					console.error('Something went wrong:', JSON.stringify(err, null, 2));
				} else {
					console.log('Create is success:', JSON.stringify(data, null, 2));
				}
			})
			.promise();

		return params.Item;
	}

	async update(pk, sk, data) {
		const params = {
			TableName: this.tableName,
			Key: {
				PK: 'ACCT_115',
				SK: 'POST_8d0rgh66sl1dyvrufp8d0rgh66sl1dyvrue',
			},
			UpdateExpression: 'SET #1be70 = :1be70, #1be71 = :1be71, #1be72 = :1be72, #1be72 = :1be72',
			ExpressionAttributeValues: {
				':1be70': data.CategoryName,
				':1be71': data.UpdatedBy,
				':1be72': data.UpdatedDate,
				':1be72': data.Thumbnail,
			},
			ExpressionAttributeNames: {
				'#1be70': 'CategoryName',
				'#1be71': 'UpdatedBy',
				'#1be72': 'UpdatedDate',
				'#1be73': 'Thumbnail',
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

module.exports = new TagRepository();
