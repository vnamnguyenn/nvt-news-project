const {dynamoDB, docClient} = require(`../../config/dynamoDB`);
const {currentTime, currentTimePrefixMonth} = require('../../config/currentTime');
const uniqid = require('uniqid');
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
					AttributeName: 'SavePostID',
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
							AttributeName: 'SavePostID',
							KeyType: 'HASH',
						},
					],
					Projection: {
						ProjectionType: 'INCLUDE',
						NonKeyAttributes: [
							'PostTitle',
							'Thumbnail',
							'CreatedDate',
							'AuthorInfo',
							'ReadingTime',
							'PublishedDate',
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
		let jsonData = JSON.parse(fs.readFileSync(__dirname + '/BlogData.json', 'utf8'));
		jsonData.forEach(function (data) {
			let params = {};
			if (data.TagId !== undefined) {
				params = {
					TableName: 'Blog',
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
			} else if (data.UserEmail !== undefined) {
				params = {
					TableName: 'Blog',
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
					TableName: 'Blog',
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
					TableName: 'Blog',
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
			} else if (data.SavePostID !== undefined) {
				params = {
					TableName: 'Blog', //5. SavePostIndex
					Item: {
						PK: data.PK,
						SK: data.SK,
						PostTitle: data.PostTitle,
						Thumbnail: data.Thumbnail,
						CreatedDate: data.CreatedDate,
						AccountInfo: data.AccountId,
						ReadingTime: data.ReadingTime,
						PublishedDate: data.PublishedDate,
					},
				};
			} else if (data.BackupID !== undefined) {
				params = {
					TableName: 'Blog', //6. BackupIndex
					Item: {
						PK: data.PK,
						SK: data.SK,
						CreatedDate: data.CreatedDate,
						AccountId: data.AccountId,
						Path: data.Path,
						BackupName: data.BackupName,
					},
				};
			} else {
				params = {
					TableName: 'Blog',
					Item: {
						PK: data.PK,
						SK: data.SK,
						PostID: data.PostID,
						PostTitle: data.PostTitle,
						Content: data.Content,
						Thumbnail: data.Thumbnail,
						PostImage: data.PostImage,
						Description: data.Description,
						MetaDescription: data.MetaDescription,
						MetaKeyword: data.MetaKeyword,
						Published: data.Published,
						CreatedDate: data.CreatedDate,
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

	async addBackupFromFile(pk, contentFile) {
		let id = uniqid('bk');
		const fileName = 'backup-' + currentTime + '-' + Date.now();
		fs.writeFile(
			__dirname.replace('database', '../backup/') + fileName + '.json',
			contentFile,
			(err) => {
				if (err) {
					console.error(err);
				}
			},
		);

		const backupParams = {
			TableName: this.tableName,
			Item: {
				PK: pk,
				SK: 'BAK_' + id,
				BackupID: id,
				BackupName: fileName,
				Path: fileName + '.json',
				CreatedDate: currentTime + ' ' + new Date().toLocaleTimeString('vi-VN'),
			},
		};
		await docClient.put(backupParams).promise();
		return backupParams.Item;
	}

	async restoreBackup(Path) {
		let jsonData = JSON.parse(
			fs.readFileSync(__dirname.replace('database', '../backup/') + Path, 'utf8'),
		);
		jsonData.forEach(function (data) {
			let params = {};
			if (data.TagId !== undefined) {
				params = {
					TableName: 'Blog',
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
			} else if (data.UserEmail !== undefined) {
				params = {
					TableName: 'Blog',
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
					TableName: 'Blog',
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
					TableName: 'Blog',
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
			} else if (data.SavePostID !== undefined) {
				params = {
					TableName: 'Blog', //5. SavePostIndex
					Item: {
						PK: data.PK,
						SK: data.SK,
						PostTitle: data.PostTitle,
						Thumbnail: data.Thumbnail,
						CreatedDate: data.CreatedDate,
						AccountInfo: data.AccountId,
						ReadingTime: data.ReadingTime,
						PublishedDate: data.PublishedDate,
					},
				};
			} else if (data.BackupID !== undefined) {
				params = {
					TableName: 'Blog', //6. BackupIndex
					Item: {
						PK: data.PK,
						SK: data.SK,
						CreatedDate: data.CreatedDate,
						AccountId: data.AccountId,
						Path: data.Path,
						BackupName: data.BackupName,
					},
				};
			} else {
				params = {
					TableName: 'Blog', //7. PostIndex
					Item: {
						PK: data.PK,
						SK: data.SK,
						PostID: data.PostID,
						PostTitle: data.PostTitle,
						Content: data.Content,
						Thumbnail: data.Thumbnail,
						PostImage: data.PostImage,
						Description: data.Description,
						MetaDescription: data.MetaDescription,
						MetaKeyword: data.MetaKeyword,
						Published: data.Published,
						PublishedDate: data.PublishedDate,
						CreatedDate: data.CreatedDate,
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

	async getBackup() {
		const params = {
			TableName: this.tableName,
			IndexName: 'BackupIndex',
		};
		return await docClient.scan(params).promise();
	}

	async createBackup(pk) {
		let id = uniqid('bk');
		const fileName = 'backup-' + currentTime + '-' + Date.now();
		const params = {
			TableName: this.tableName,
		};

		const data = await docClient.scan(params).promise();
		const content = JSON.stringify(data.Items);
		fs.writeFile(
			__dirname.replace('database', '../backup/') + fileName + '.json',
			content,
			(err) => {
				if (err) {
					console.error(err);
				}
			},
		);
		const backupParams = {
			TableName: this.tableName,
			Item: {
				PK: pk,
				SK: 'BAK_' + id,
				BackupID: id,
				BackupName: fileName,
				Path: fileName + '.json',
				CreatedDate: currentTime + ' ' + new Date().toLocaleTimeString('vi-VN'),
			},
		};
		await docClient.put(backupParams).promise();
		return backupParams.Item;
	}

	async deleteBackup(pk, backupId) {
		const params = {
			TableName: this.tableName,
			Key: {
				PK: pk,
				SK: 'BAK_' + backupId,
			},
		};

		const params2 = {
			TableName: this.tableName,
			IndexName: 'BackupIndex',
			KeyConditionExpression: '#38cd0 = :38cd0',
			ExpressionAttributeValues: {
				':38cd0': backupId,
			},
			ExpressionAttributeNames: {
				'#38cd0': 'BackupID',
			},
		};

		const data = await docClient.query(params2).promise();
		const filePath = data.Items[0].Path;
		fs.unlinkSync(__dirname.replace('database', '../backup/') + filePath);
		return await docClient.delete(params).promise();
	}
}

module.exports = new DBRepository();
