const {docClient} = require(`../../config/dynamoDB`);
const uniqid = require('uniqid');
const userRepository = require('../users/userRepository');
const currentTime = require('../../config/currentTime');
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

		return await docClient.query(params).promise();
	}

	async getAll() {
		const params = {
			TableName: this.tableName,
			IndexName: 'CategoryIndex',
		};
		return await docClient.scan(params).promise();
	}

	async create(pk, data) {
		const getUserInfo = await userRepository.findByID(pk);
		let id = uniqid('c');
		const params = {
			TableName: this.tableName,
			Item: {
				CategoryId: id,
				PK: pk,
				SK: 'CAT_' + id,
				Slug: data.Slug,
				CategoryName: data.CategoryName,
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

	async update(pk,sk, data) {
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

		const update = await docClient.update(params).promise();

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

		return await docClient.delete(params).promise();
	}
}

module.exports = new CategoryRepository();
