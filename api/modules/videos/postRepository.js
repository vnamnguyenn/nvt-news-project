const db = require(`../../config/dynamoDB`);
const {v4: uuidv4} = require('uuid');

class PostRepository {
	constructor() {
		this.tableName = 'Blog';
	}

	async findByID(PK) {
		const params = {
			TableName: this.tableName,
			Key: {
				PK: PK,
				SK: 'f2d13e5f-b67b-4be0-a839-a28019474599',
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
			IndexName: 'PostIndex',
		};
		return await db.scan(params).promise();
	}

	async create(data) {
		const params = {
			TableName: this.tableName,
			Item: {
				PostID: uuidv4(),
				PK: 'ACCT_' + '123',
				SK: 'POST_' + uuidv4(),
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
				ReadingTime: data.ReadingTime
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
				SK: 'ACCT#vn13012000@gmail.com',
			},
		};

		return await db.delete(params).promise();
	}
}

module.exports = new PostRepository();
