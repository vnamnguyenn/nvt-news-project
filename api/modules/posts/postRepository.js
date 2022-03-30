const db = require(`../../config/dynamoDB`);
const uniqid = require('uniqid');

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

	async getAll() {
		const params = {
			TableName: this.tableName,
			IndexName: 'PostIndex',
		};
		return await db.scan(params).promise();
	}

	async create(data) {
		let id = uniqid('p'); 
		const params = {
			TableName: this.tableName,
			Item: {
				PostID: id,
				PK: 'ACCT_115',
				SK: ('POST_')+id,
				UserEmail: 'empty',
				PostTitle: data.PostTitle,
				Content: data.Content,
				Slug: data.Slug,
				Thumbnail: data.Thumbnail,
				PostImage: data.PostImage,
				LikeCount: '0',
				CommentCount: '0',
				SaveCount: '0',
				ViewCount: '0',
				MetaTitle: data.MetaTitle,
				MetaDescription: data.MetaDescription,
				MetaKeyword: data.MetaKeyword,
				Published: data.Published,
				PublishedDate: data.PublishedDate,
				CreatedBy: data.CreatedBy,
				UpdatedBy: data.UpdatedBy,
				CreatedDate: data.CreatedDate,
				UpdatedDate: data.UpdatedDate,
				ReadingTime: data.ReadingTime,
			},
		};

		await db.put(params).promise();

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

module.exports = new PostRepository();
