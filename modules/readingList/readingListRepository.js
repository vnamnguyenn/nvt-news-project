const {docClient} = require(`../../config/dynamoDB`);
const uniqid = require('uniqid');
const {currentTime} = require('../../config/currentTime');
const userRepository = require('../users/userRepository');
class ReadingListRepository {
	constructor() {
		this.tableName = 'Blog';
	}

	async getAll(pk) {
		const params = {
			TableName: this.tableName,
			IndexName: 'SavePostIndex',
			FilterExpression: '#e14e0 = :e14e0',
			ExpressionAttributeValues: {
				':e14e0': pk,
			},
			ExpressionAttributeNames: {
				'#e14e0': 'PK',
			},
		};
		return await docClient.scan(params).promise();
	}

	async create(pk, data) {
		let id = uniqid('r');
		const params = {
			TableName: this.tableName,
			Item: {
				PK: pk,
				SK: 'SAV_' + data.PostID,
				SavePostID: data.PostID,
				PostTitle: data.PostTitle,
				Thumbnail: data.Thumbnail,
				ReadingTime: data.ReadingTime,
				AuthorInfo: data.AuthorInfo,
				CreatedDate: currentTime + ' ' + new Date().toLocaleTimeString('vi-VN'),
				PublishedDate: data.PublishedDate,
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

	async deleteByID(pk, SaveID) {
		const params = {
			TableName: this.tableName,
			Key: {
				PK: pk,
				SK: 'SAV_' + SaveID,
			},
		};

		return await docClient.delete(params).promise();
	}
}

module.exports = new ReadingListRepository();
