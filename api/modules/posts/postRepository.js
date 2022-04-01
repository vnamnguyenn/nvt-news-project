const db = require(`../../config/dynamoDB`);
const uniqid = require('uniqid');
const userController = require('../users/userController');
const userRepository = require('../users/userRepository');
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

	async olderPost() {
		const params = {
			TableName: this.tableName,
			IndexName: 'PostIndex',
			FilterExpression: 'begins_with(#70900, :70900)',
			Limit: '6',
			ExpressionAttributeValues: {
				':70900': '2022',
			},
			ExpressionAttributeNames: {
				'#70900': 'CreatedDate',
			},
		};
		return await db.scan(params).promise();
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
			FilterExpression: 'attribute_exists(#37e20)',
			Limit: 5,
			ExpressionAttributeNames: {'#37e20': 'ViewCount'},
		};
		return await db.scan(params).promise();
	}

	async olderPost() {
		const params = {
			TableName: this.tableName,
			IndexName: 'PostIndex',
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
		const curentCreateAt =
			today.getFullYear() +
			'-' +
			(today.getMonth() + 1) +
			'-' +
			today.getDate() +
			' ' +
			today.getHours() +
			':' +
			today.getMinutes() +
			':' +
			today.getSeconds();
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
				LikeCount: '0',
				CommentCount: '0',
				SaveCount: '0',
				Description: data.Description,
				MetaTitle: data.MetaTitle,
				MetaDescription: data.MetaDescription,
				MetaKeyword: data.MetaKeyword,
				Published: data.Published,
				PublishedDate: currentPushlished,
				CreatedBy: getUserInfo.Item.FullName,
				CreatedDate: curentCreateAt,
				ReadingTime: data.ReadingTime,
				Categories: data.Categories,
				Tags: data.Tags,
				AuthorInfo: {
					PK: getUserInfo.Item.PK,
					PK: getUserInfo.Item.PK,
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

	async update(data) {
		const params = {
			TableName: this.tableName,
			Key: {
				PK: 'ACCT_115',
				SK: 'POST_8d0rgh66sl1dyvrufp8d0rgh66sl1dyvrue',
			},
			UpdateExpression:
				'SET #1be70 = :1be70, #1be71 = :1be71, #1be72 = :1be72, #1be73 = :1be73, #1be74 = :1be74, #1be75 = :1be75',
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

	async deleteByID(id, postId) {
		const params = {
			TableName: this.tableName,
			Key: {
				PK: id,
				SK: 'POST_' + postId,
			},
		};

		return await db.delete(params).promise();
	}
}

module.exports = new PostRepository();
