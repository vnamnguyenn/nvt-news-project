const {docClient} = require(`../../config/dynamoDB`);
const uniqid = require('uniqid');
const {currentTime} = require('../../config/currentTime');
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

		return await docClient.query(params).promise();
	}

	async getAll() {
		const params = {
			TableName: this.tableName,
			IndexName: 'TagIndex',
		};
		return await docClient.scan(params).promise();
	}

	async create(pk, data) {
		let id = uniqid('t');
		const params = {
			TableName: this.tableName,
			Item: {
				TagId: id,
				PK: pk,
				SK: 'TAG_' + id,
				TagName: data.TagName,
				Thumbnail: data.Thumbnail,
				CreatedDate: currentTime + ' ' + new Date().toLocaleTimeString('vi-VN'),
				UpdatedDate: currentTime + ' ' + new Date().toLocaleTimeString('vi-VN'),
			},
		};

		await docClient
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

	async update(pk, tagId, data) {
		const params = {
			TableName: this.tableName,
			Key: {
				PK: pk,
				SK: 'TAG_' + tagId,
			},
			UpdateExpression: 'SET #14b60 = :14b60, #14b61 = :14b61, #14b62 = :14b62',
			ExpressionAttributeValues: {
				':14b60': data.TagName,
				':14b61': data.Thumbnail,
				':14b62': currentTime + ' ' + new Date().toLocaleTimeString('vi-VN'),
			},
			ExpressionAttributeNames: {
				'#14b60': 'TagName',
				'#14b61': 'Thumbnail',
				'#14b62': 'UpdatedDate',
			},
			ReturnValues: `UPDATED_NEW`,
		};

		const update = await docClient.update(params).promise();

		return update.Attributes;
	}

	async deleteByID(pk, tagId) {
		const params = {
			TableName: this.tableName,
			Key: {
				PK: pk,
				SK: 'TAG_' + tagId,
			},
		};

		return await docClient.delete(params).promise();
	}
}

module.exports = new TagRepository();
