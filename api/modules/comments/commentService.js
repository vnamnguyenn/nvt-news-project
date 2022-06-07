const CommentRepository = require(`../comments/commentRepository`);

class CommentService {
	async create(pk, data) {
		return await CommentRepository.create(pk, {
			PostID: data.PostID,
			CommentContent: data.CommentContent,
			ParentCommentId: data.ParentCommentId,
		});
	}

	async getComment(postID) {
		const data = await CommentRepository.getComment(postID);

		if (data) {
			return data.Items;
		}

		return data;
	}

	async getReply(commentID) {
		const data = await CommentRepository.getReply(commentID);

		if (data) {
			return data.Items;
		}

		return data;
	}
}

module.exports = new CommentService();
