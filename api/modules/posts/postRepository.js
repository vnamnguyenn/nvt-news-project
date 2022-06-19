const uniqid = require('uniqid');
const {docClient} = require(`../../config/dynamoDB`);
const userRepository = require('../users/userRepository');
const {currentTime, currentTimePrefixMonth} = require('../../config/currentTime');
class PostRepository {
	constructor() {
		this.tableName = 'Blog';
	}

	async findByID(id) {
		const params = {
			TableName: this.tableName,
			IndexName: 'PostIndex',
			KeyConditionExpression: '#38cd0 = :38cd0',
			ExpressionAttributeValues: {
				':38cd0': id,
			},
			ExpressionAttributeNames: {
				'#38cd0': 'PostID',
			},
		};

		return await docClient.query(params).promise();
	}

	async search(title) {
		const params = {
			TableName: this.tableName,
			IndexName: 'PostIndex',
			FilterExpression: 'contains(#74620, :74620)',
			ExpressionAttributeValues: {
				':74620': title,
			},
			ExpressionAttributeNames: {
				'#74620': 'PostTitle',
			},
		};
		return await docClient.scan(params).promise();
	}

	async getAll() {
		const params = {
			TableName: this.tableName,
			IndexName: 'PostIndex',
		};
		return await docClient.scan(params).promise();
	}

	async getPostByAuthor(pk) {
		const params = {
			TableName: this.tableName,
			IndexName: 'PostIndex',
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
		const getUserInfo = await userRepository.findByID(pk);
		let id = uniqid('p');
		const params = {
			TableName: this.tableName,
			Item: {
				PostID: id,
				PK: pk,
				SK: 'POST_' + id,
				PostTitle: data.PostTitle,
				Content: data.Content,
				Thumbnail: data.Thumbnail,
				PostImage: data.PostImage,
				Description: data.Description,
				MetaDescription: data.MetaDescription,
				MetaKeyword: data.MetaKeyword,
				Published: data.Published,
				PublishedDate: currentTimePrefixMonth,
				CreatedDate: currentTime + ' ' + new Date().toLocaleTimeString('vi-VN'),
				UpdatedDate: currentTime + ' ' + new Date().toLocaleTimeString('vi-VN'),
				ReadingTime: data.ReadingTime,
				Categories: data.Categories,
				Tags: data.Tags,
				AuthorInfo: {
					PK: getUserInfo.Item.PK,
					AccountId: getUserInfo.Item.AccountId,
					FullName: getUserInfo.Item.FullName,
					Avatar: getUserInfo.Item.Avatar,
					Description: getUserInfo.Item.Description,
				},
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

	async update(pk, postId, data) {
		const params = {
			TableName: this.tableName,
			Key: {
				PK: pk,
				SK: 'POST_' + postId,
			},
			UpdateExpression:
				'SET #1be71 = :1be71, #1be72 = :1be72, #1be73 = :1be73,	#1be75 = :1be75, #1be76 = :1be76,' +
				'#1be77 = :1be77, #1be78 = :1be78, #1be79 = :1be79, #1be80 = :1be80, #1be81 = :1be81,#1be82 = :1be82,#1be83 = :1be83',
			ExpressionAttributeValues: {
				':1be71': data.PostImage,
				':1be72': data.Thumbnail,
				':1be73': data.ReadingTime,
				':1be75': data.PostTitle,
				':1be76': currentTime + ' ' + new Date().toLocaleTimeString('vi-VN'),
				':1be77': data.Description,
				':1be78': data.Published,
				':1be79': data.Content,
				':1be80': data.MetaDescription,
				':1be81': data.MetaKeyword,
				':1be82': data.Tags,
				':1be83': data.Categories,
			},
			ExpressionAttributeNames: {
				'#1be71': 'PostImage',
				'#1be72': 'Thumbnail',
				'#1be73': 'ReadingTime',
				'#1be75': 'PostTitle',
				'#1be76': 'UpdatedDate',
				'#1be77': 'Description',
				'#1be78': 'Published',
				'#1be79': 'Content',
				'#1be80': 'MetaDescription',
				'#1be81': 'MetaKeyword',
				'#1be82': 'Tags',
				'#1be83': 'Categories',
			},
			ReturnValues: `UPDATED_NEW`,
		};

		const update = await docClient.update(params).promise();

		return update.Attributes;
	}

	async deleteByID(pk, postId) {
		const params = {
			TableName: this.tableName,
			Key: {
				PK: pk,
				SK: 'POST_' + postId,
			},
		};
		return await docClient.delete(params).promise();
	}
}

module.exports = new PostRepository();
