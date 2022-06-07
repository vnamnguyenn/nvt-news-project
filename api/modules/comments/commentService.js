const CommentRepository = require(`../comments/commentRepository`);

class CommentService {
	async create(pk, data) {
		return await CommentRepository.create(pk, {
			ParentPostID: data.ParentPostID,
			CommentContent: data.CommentContent,
			ParentCommentId: data.ParentCommentId,
		});
	}

	async updateByID(pk, CommentId, data) {
		return await CommentRepository.updateByID(pk, CommentId, {
			CommentContent: data.CommentContent,
		});
	}

	async deleteByID(pk, CommentId) {
		return await CommentRepository.deleteByID(pk, CommentId);
	}

	async getComment(postID) {
		const data = await CommentRepository.getComment(postID);

		if (data) {
			return data.Items;
		}

		return data;
	}
}

module.exports = new CommentService();
