const CommentService = require(`../comments/commentService`);

class CommentController {
	async create(req, res) {
		try {
			const data = await CommentService.create(req.user.pk, req.body);
			res.status(200).json(data);
		} catch (err) {
			console.error(err);
			res.status(500).json({err: 'Something went wrong'});
		}
	}

	async updateByID(req, res) {
		try {
			const data = await CommentService.updateByID(req.user.pk, req.params.CommentId, req.body);
			res.status(200).json(data);
		} catch (err) {
			res.status(500).json(err);
		}
	}

	async deleteByID(req, res) {
		try {
			const data = await CommentService.deleteByID(req.user.pk, req.params.CommentId);
			if (data) {
				res.status(200).json('Delete in successfully');
			}
		} catch (err) {
			console.error(err);
			res.status(500).json({err: 'Something went wrong'});
		}
	}

	async getComment(req, res) {
		try {
			const data = await CommentService.getComment(req.params.postID);
			res.json(data);
		} catch (err) {
			console.error(err);
			res.status(500).json({err: 'Something went wrong'});
		}
	}
}

module.exports = new CommentController();
