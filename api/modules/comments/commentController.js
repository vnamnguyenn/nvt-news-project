const CommentService = require(`../comments/commentService`);

class CommentController {
	async create(req, res) {
		try {
			const data = await CommentService.create(req.user.pk, req.body);
			res.status(200).json(data);
			console.log(req.user.pk);
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
