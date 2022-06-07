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
				CreatedDate: new Date(),
				AccountInfo: {
					AccountId: getUserInfo.Item.AccountId,
					FullName: getUserInfo.Item.FullName,
					Avatar: getUserInfo.Item.Avatar,
				},
			},
		};
		await docClient
			.put(params, function (err, data) {
				if (err) {
					console.log(err);
				} else {
					console.log('Create is success:', JSON.stringify(data, null, 2));
				}
			})
			.promise();
		return params.Item;
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
