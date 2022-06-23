const uniqid = require('uniqid');
const {docClient} = require(`../../config/dynamoDB`);
const userRepository = require('../users/userRepository');
const {currentTime} = require('../../config/currentTime');
class CommentRepository {
	constructor() {
		this.tableName = 'Blog';
	}

	async create(pk, data) {
		const getUserInfo = await userRepository.findByID(pk);
		let id = uniqid('c');
		const params = {
			TableName: this.tableName,
			Item: {
				PK: pk,
				SK: 'CMT_' + id,
				CommentId: id,
				ParentPostID: data.ParentPostID,
				CommentContent: data.CommentContent,
				ParentCommentId: data.ParentCommentId,
				CreatedDate: currentTime + ' ' + new Date().toLocaleTimeString('vi-VN'),
				AccountInfo: {
					AccountId: getUserInfo.Item.AccountId,
					FullName: getUserInfo.Item.FullName,
					Avatar: getUserInfo.Item.Avatar,
				},
			},
		};
		await docClient.put(params).promise();
		return params.Item;
	}

	async updateByID(pk, CommentId, data) {
		const params = {
			TableName: this.tableName,
			Key: {
				PK: pk,
				SK: 'CMT_' + CommentId,
			},
			UpdateExpression: 'SET #27820 = :27820',
			ExpressionAttributeValues: {
				':27820': data.CommentContent,
			},
			ExpressionAttributeNames: {
				'#27820': 'CommentContent',
			},
			ReturnValues: `UPDATED_NEW`,
		};

		const update = await docClient.update(params).promise();

		return update.Attributes;
	}

	async deleteByID(pk, CommentId) {
		const params = {
			TableName: this.tableName,
			Key: {
				PK: pk,
				SK: 'CMT_' + CommentId,
			},
		};

		return await docClient.delete(params).promise();
	}

	async getComment(postID) {
		const params = {
			TableName: this.tableName,
			IndexName: 'CommentIndex',
			FilterExpression: '#43ed0 = :43ed0',
			ExpressionAttributeValues: {
				':43ed0': postID,
			},
			ExpressionAttributeNames: {
				'#43ed0': 'ParentPostID',
			},
		};
		return await docClient.scan(params).promise();
	}

	async share(commentID) {
		const params = {
			TableName: this.tableName,
			IndexName: 'CommentIndex',
			KeyConditionExpression: '#f0ac0 = :f0ac0',
			ExpressionAttributeValues: {
				':f0ac0': commentID,
			},
			ExpressionAttributeNames: {
				'#f0ac0': 'CommentId',
			},
		};
		return await docClient.scan(params).promise();
	}
}

module.exports = new CommentRepository();
