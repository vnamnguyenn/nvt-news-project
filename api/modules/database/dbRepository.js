const {dynamoDB, docClient} = require(`../../config/dynamoDB`);
const fs = require('fs');
class DBRepository {
	constructor() {
		this.tableName = 'Blog';
	}

	async createTable() {
		const params = {
			TableName: this.tableName,
			KeySchema: [
				{
					AttributeName: 'PK',
					KeyType: 'HASH',
				},
				{
					AttributeName: 'SK',
					KeyType: 'RANGE',
				},
			],
			BillingMode: 'PROVISIONED',
			AttributeDefinitions: [
				{
					AttributeName: 'PK',
					AttributeType: 'S',
				},
				{
					AttributeName: 'SK',
					AttributeType: 'S',
				},
				{
					AttributeName: 'UserEmail',
					AttributeType: 'S',
				},
				{
					AttributeName: 'PostID',
					AttributeType: 'S',
				},
				{
					AttributeName: 'TagId',
					AttributeType: 'S',
				},
				{
					AttributeName: 'CategoryId',
					AttributeType: 'S',
				},
				{
					AttributeName: 'CommentId',
					AttributeType: 'S',
				},
				{
					AttributeName: 'BackupID',
					AttributeType: 'S',
				},
				{
					AttributeName: 'SaveID',
					AttributeType: 'S',
				},
			],
			ProvisionedThroughput: {
				ReadCapacityUnits: 1,
				WriteCapacityUnits: 1,
			},
			GlobalSecondaryIndexes: [
				{
					IndexName: 'AccountIndex', //1. AccountIndex
					KeySchema: [
						{
							AttributeName: 'UserEmail',
							KeyType: 'HASH',
						},
					],
					Projection: {
						ProjectionType: 'INCLUDE',
						NonKeyAttributes: [
							'AccountId',
							'PhoneNumber',
							'FullName',
							'DateOfBirth',
							'isAdmin',
							'PasswordHash',
							'Avatar',
							'Description',
							'IsActive',
							'Gender',
							'LastLogin',
							'CreatedDate',
							'UpdatedDate',
						],
					},
					ProvisionedThroughput: {
						ReadCapacityUnits: 1,
						WriteCapacityUnits: 1,
					},
				},
				{
					IndexName: 'PostIndex', //2. PostIndex
					KeySchema: [
						{
							AttributeName: 'PostID',
							KeyType: 'HASH',
						},
					],
					Projection: {
						ProjectionType: 'INCLUDE',
						NonKeyAttributes: [
							'PostTitle',
							'Thumbnail',
							'PostImage',
							'CommentCount',
							'ViewCount',
							'SaveCount',
							'MetaDescription',
							'MetaKeyword',
							'Published',
							'PublishedDate',
							'CreatedDate',
							'UpdatedDate',
							'ReadingTime',
							'Content',
							'Description',
							'LikeCount',
							'AuthorInfo',
							'Tags',
							'Categories',
						],
					},
					ProvisionedThroughput: {
						ReadCapacityUnits: 1,
						WriteCapacityUnits: 1,
					},
				},
				{
					IndexName: 'CategoryIndex', //3. CategoryIndex
					KeySchema: [
						{
							AttributeName: 'CategoryId',
							KeyType: 'HASH',
						},
					],
					Projection: {
						ProjectionType: 'INCLUDE',
						NonKeyAttributes: [
							'CategoryName',
							'Thumbnail',
							'CreatedDate',
							'UpdatedDate',
							'AccountInfo',
						],
					},
					ProvisionedThroughput: {
						ReadCapacityUnits: 1,
						WriteCapacityUnits: 1,
					},
				},
				{
					IndexName: 'TagIndex', //4. TagIndex
					KeySchema: [
						{
							AttributeName: 'TagId',
							KeyType: 'HASH',
						},
					],
					Projection: {
						ProjectionType: 'INCLUDE',
						NonKeyAttributes: ['TagName', 'Thumbnail', 'CreatedDate', 'UpdatedDate', 'AccountInfo'],
					},
					ProvisionedThroughput: {
						ReadCapacityUnits: 1,
						WriteCapacityUnits: 1,
					},
				},
				{
					IndexName: 'CommentIndex', //5. CommentIndex
					KeySchema: [
						{
							AttributeName: 'CommentId',
							KeyType: 'HASH',
						},
					],
					Projection: {
						ProjectionType: 'INCLUDE',
						NonKeyAttributes: [
							'ParentPostID',
							'CommentContent',
							'ParentCommentId',
							'CreatedDate',
							'AccountInfo',
						],
					},
					ProvisionedThroughput: {
						ReadCapacityUnits: 1,
						WriteCapacityUnits: 1,
					},
				},
				{
					IndexName: 'BackupIndex', //6. BackupIndex
					KeySchema: [
						{
							AttributeName: 'BackupID',
							KeyType: 'HASH',
						},
					],
					Projection: {
						ProjectionType: 'INCLUDE',
						NonKeyAttributes: ['CreatedDate', 'Path', 'AccountId', 'BackupName'],
					},
					ProvisionedThroughput: {
						ReadCapacityUnits: 1,
						WriteCapacityUnits: 1,
					},
				},
				{
					IndexName: 'SavePostIndex', //7. SavePostIndex
					KeySchema: [
						{
							AttributeName: 'SaveID',
							KeyType: 'HASH',
						},
					],
					Projection: {
						ProjectionType: 'INCLUDE',
						NonKeyAttributes: [
							'ParentPostID',
							'Description',
							'Thumbnail',
							'CreatedDate',
							'AccountId',
						],
					},
					ProvisionedThroughput: {
						ReadCapacityUnits: 1,
						WriteCapacityUnits: 1,
					},
				},
			],
		};
		return await dynamoDB.createTable(params).promise();
	}

	async deleteTable() {
		const params = {
			TableName: this.tableName,
		};

		return await dynamoDB.deleteTable(params).promise();
	}

	async importData() {
		const jsonData = JSON.parse(fs.readFileSync(__dirname + '/BlogData.json', 'utf8'));
		jsonData.forEach(function (data) {
			let params = {};
			if (data.TagId !== undefined) {
				params = {
					TableName: this.tableName, //1. Tag
					Item: {
						PK: data.PK,
						SK: data.SK,
						TagId: data.TagId,
						TagName: data.TagName,
						Thumbnail: data.Thumbnail,
						CreatedDate: data.CreatedDate,
						UpdatedDate: data.UpdatedDate,
					},
				};
			} else if (data.AccountId !== undefined) {
				params = {
					TableName: this.tableName, //2. Account
					Item: {
						AccountId: data.AccountId,
						UserEmail: data.UserEmail,
						PK: data.PK,
						SK: data.SK,
						FullName: data.FullName,
						Gender: data.Gender,
						DateOfBirth: data.DateOfBirth,
						isAdmin: data.isAdmin,
						PasswordHash: data.PasswordHash,
						IsActive: data.IsActive,
						Avatar: data.Avatar,
						Description: data.Description,
						CreatedDate: data.CreatedDate,
					},
				};
			} else if (data.CategoryId !== undefined) {
				params = {
					TableName: this.tableName, //3. Category
					Item: {
						PK: data.PK,
						SK: data.SK,
						CategoryId: data.CategoryId,
						CategoryName: data.CategoryName,
						Thumbnail: data.Thumbnail,
						CreatedDate: data.CreatedDate,
						UpdatedDate: data.UpdatedDate,
					},
				};
			} else if (data.CommentId !== undefined) {
				params = {
					TableName: this.tableName, //4. Comment
					Item: {
						PK: data.PK,
						SK: data.SK,
						CommentId: data.CommentId,
						ParentPostID: data.ParentPostID,
						CommentContent: data.CommentContent,
						ParentCommentId: data.ParentCommentId,
						CreatedDate: data.CreatedDate,
						AccountInfo: data.AccountInfo,
					},
				};
			} else if (data.SaveID !== undefined) {
				params = {
					TableName: this.tableName, //5. SavePostIndex
					Item: {
						PK: data.PK,
						SK: data.SK,
						ParentPostID: data.ParentPostID,
						Description: data.Description,
						Thumbnail: data.Thumbnail,
						CreatedDate: data.CreatedDate,
						AccountId: data.AccountId,
					},
				};
			} else if (data.BackupID !== undefined) {
				params = {
					TableName: this.tableName, //5. BackupIndex
					Item: {
						PK: data.PK,
						SK: data.SK,
						CreatedDate: data.CreatedDate,
						Path: data.Path,
						AccountId: data.AccountId,
						BackupName: data.BackupName,
					},
				};
			} else {
				params = {
					TableName: this.tableName, //7. Post
					Item: {
						PK: data.PK,
						SK: data.SK,
						PostID: data.PostID,
						PostTitle: data.PostTitle,
						Content: data.Content,
						Thumbnail: data.Thumbnail,
						PostImage: data.PostImage,
						Description: data.Description,
						LikeCount: data.LikeCount,
						SaveCount: data.SaveCount,
						CommentCount: data.CommentCount,
						ViewCount: data.ViewCount,
						MetaDescription: data.MetaDescription,
						MetaKeyword: data.MetaKeyword,
						Published: data.Published,
						PublishedDate: data.PublishedDate,
						UpdatedDate: data.UpdatedDate,
						ReadingTime: data.ReadingTime,
						Categories: data.Categories,
						Tags: data.Tags,
						AuthorInfo: data.AuthorInfo,
					},
				};
			}
			docClient.put(params).promise();
		});
	}

	async exportData() {
		const params = {
			TableName: this.tableName,
		};

		docClient.scan(params, function onScan(err, data) {
			if (err) {
				console.error('Unable to scan the table. Error JSON:', JSON.stringify(err, null, 2));
			} else {
				const content = JSON.stringify(data.Items);
				fs.writeFile(__dirname + '/BlogData.json', content, (err) => {
					if (err) {
						console.error(err);
					}
					console.log('Export Data in successfully.');
				});
			}
		});
	}
}

module.exports = new DBRepository();
