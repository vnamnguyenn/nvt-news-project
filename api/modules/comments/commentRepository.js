const uniqid = require('uniqid');
const {docClient} = require(`../../config/dynamoDB`);
const userRepository = require('../users/userRepository');
const {currentTime, currentTimePrefixMonth} = require('../../config/currentTime');
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
				PK: 'ACCT_ujygff5gl42l9l7v',
				SK: 'CMT_' + id,
				CommentId: id,
				PostID: data.PostID,
				CommentContent: data.CommentContent,
				ParentCommentId: data.ParentCommentId,
				CreatedDate: currentTime,
				AccountInfo: {
					PK: getUserInfo.Item.PK,
					AccountId: getUserInfo.Item.AccountId,
					FullName: getUserInfo.Item.FullName,
					Avatar: getUserInfo.Item.Avatar,
				},
			},
		};
		await docClient.put(params).promise();
		return params.Item;
	}

	async getComment(postID) {
		const params = {
			TableName: this.tableName,
			IndexName: 'CommentIndex',
			FilterExpression: '#43ed0 = :43ed0 And #43ed1 = :43ed1',
			ExpressionAttributeValues: {
				':43ed0': postID,
				':43ed1': null,
			},
			ExpressionAttributeNames: {
				'#43ed0': 'PostID',
				'#43ed1': 'ParentCommentId',
			},
		};
		return await docClient.scan(params).promise();
	}

	async getReply(commentID) {
		const params = {
			TableName: this.tableName,
			IndexName: 'CommentIndex',
			FilterExpression: '#22810 = :22810',
			ExpressionAttributeValues: {
				':22810': commentID,
			},
			ExpressionAttributeNames: {
				'#22810': 'ParentCommentId',
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
