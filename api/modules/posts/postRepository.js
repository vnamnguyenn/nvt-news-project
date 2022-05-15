const db = require(`../../config/dynamoDB`);
const uniqid = require('uniqid');
const userRepository = require('../users/userRepository');
const currentTime = require('../../config/currentTime');
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

		return await db.query(params).promise();
	}

	async featuredArticles() {
		const params = {
			TableName: this.tableName,
			IndexName: 'PostIndex',
			FilterExpression: '#128c0 >= :128c0 And #128c1 >= :128c1',
			Limit: 3,
			ExpressionAttributeNames: {'#128c0': 'LikeCount', '#128c1': 'CommentCount'},
			ExpressionAttributeValues: {':128c0': '0', ':128c1': '0'},
		};
		return await db.scan(params).promise();
	}

	async trendingNews() {
		const params = {
			TableName: this.tableName,
			IndexName: 'PostIndex',
			Limit: 5,
		};
		return await db.scan(params).promise();
	}

	async olderPost() {
		const params = {
			TableName: this.tableName,
			IndexName: 'PostIndex',
			Limit: '6',
		};
		return await db.scan(params).promise();
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
		return await db.scan(params).promise();
	}

	async getAll() {
		const params = {
			TableName: this.tableName,
			IndexName: 'PostIndex',
		};
		return await db.scan(params).promise();
	}

	async getAllAdmin() {
		const params = {
			TableName: this.tableName,
			IndexName: 'PostIndex',
		};
		return await db.scan(params).promise();
	}

	//Get post Readingtime lessthan 6 minutes
	async quickRead() {
		const today = new Date();
		const getDate =
			today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' 23:59:00';
		const params = {
			TableName: this.tableName,
			IndexName: 'PostIndex',
			FilterExpression: '#15a90 < :15a90 And (#15a91 < :15a91)',
			ExpressionAttributeNames: {'#15a90': 'ReadingTime', '#15a91': 'CreatedDate'},
			ExpressionAttributeValues: {':15a90': '6', ':15a91': getDate},
		};
		return await db.scan(params).promise();
	}

	async create(pk, data) {
		const getUserInfo = await userRepository.findByID(pk);
		const today = new Date();
		const monthNames = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		];
		const currentPushlished =
			monthNames[today.getMonth() + 1] +
			' ' +
			(today.getDate() < 10 ? '0' + today.getDate() : today.getDate()) +
			' ' +
			today.getFullYear();
		let id = uniqid('p');
		const params = {
			TableName: this.tableName,
			Item: {
				PostID: id,
				PK: pk,
				SK: 'POST_' + id,
				PostTitle: data.PostTitle,
				Content: data.Content,
				Slug: data.Slug,
				Thumbnail: data.Thumbnail,
				PostImage: data.PostImage,
				LikeCount: '10',
				CommentCount: '10',
				SaveCount: '10',
				Description: data.Description,
				UpdatedDate: currentTime,
				MetaTitle: data.MetaTitle,
				MetaDescription: data.MetaDescription,
				MetaKeyword: data.MetaKeyword,
				Published: 'active',
				PublishedDate: currentPushlished,
				CreatedBy: getUserInfo.Item.FullName,
				CreatedDate: currentTime,
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

	async update(pk, postId, data) {
		const paramById = {
			TableName: this.tableName,
			IndexName: 'PostIndex',
			KeyConditionExpression: '#38cd0 = :38cd0',
			ExpressionAttributeValues: {
				':38cd0': postId,
			},
			ExpressionAttributeNames: {
				'#38cd0': 'PostID',
			},
		};
		const getDataByID = await db.query(paramById).promise();
		const params = {
			TableName: this.tableName,
			Key: {
				PK: pk,
				SK: 'POST_' + postId,
			},
			UpdateExpression:
				'SET #1be70 = :1be70, #1be71 = :1be71, #1be72 = :1be72, #1be73 = :1be73, #1be74 = :1be74,' +
				'#1be75 = :1be75, #1be76 = :1be76, #1be77 = :1be77, #1be78 = :1be78,#1be79 = :1be79, #1be80 = :1be80, #1be81 = :1be81, #1be82 = :1be82',
			ExpressionAttributeValues: {
				':1be70': data.Content,
				':1be71': data.PostImage,
				':1be72': data.Thumbnail,
				':1be73': data.ReadingTime,
				':1be74': postId,
				':1be75': data.PostTitle,
				':1be76': currentTime,
				':1be77': getDataByID.Items[0].PublishedDate,
				':1be78': data.Published,
				':1be79': data.MetaTitle,
				':1be80': data.MetaDescription,
				':1be81': data.MetaKeyword,
				':1be82': getDataByID.Items[0].AuthorInfo,
			},
			ExpressionAttributeNames: {
				'#1be70': 'Content',
				'#1be71': 'PostImage',
				'#1be72': 'Thumbnail',
				'#1be73': 'ReadingTime',
				'#1be74': 'PostID',
				'#1be75': 'PostTitle',
				'#1be76': 'UpdatedDate',
				'#1be77': 'PublishedDate',
				'#1be78': 'Published',
				'#1be79': 'MetaTitle',
				'#1be80': 'MetaDescription',
				'#1be81': 'MetaKeyword',
				'#1be82': 'AuthorInfo',
			},
			ReturnValues: `UPDATED_NEW`,
		};

		const update = await db.update(params).promise();

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
		console.log(params.Key.PK, params.Key.SK);

		return await db.delete(params).promise();
	}
}

module.exports = new PostRepository();
