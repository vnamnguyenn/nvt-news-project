const PostService = require(`../posts/postService`);

class PostController {
	async findByID(req, res) {
		try {
			const data = await PostService.findByID(req.params.id);
			res.status(200).json(data);
		} catch (err) {
			console.error(err);
			res.status(500).json({err: 'Something went wrong'});
		}
	}

	async getAll(req, res) {
		try {
			const data = await PostService.getAll();
			res.json(data);
		} catch (err) {
			console.error(err);
			res.status(500).json({err: 'Something went wrong'});
		}
	}

	async create(req, res) {
		try {
			const data = await PostService.create(req.body);
			res.status(200).json(data);
		} catch (err) {
			console.error(err);
			res.status(500).json({err: 'Something went wrong'});
		}
	}

	async update(req, res) {
		try {
			const data = await PostService.update(req.body);
			res.status(200).json(data);
		} catch (err) {
			console.error(err);
			res.status(500).json({err: 'Something went wrong'});
		}
	}

	async deleteByID(req, res) {
		try {
			await PostService.deleteByID(req.params.id);
			res.json('Delete is success');
		} catch (err) {
			console.error(err);
			res.status(500).json({err: 'Something went wrong'});
		}
	}
}

module.exports = new PostController();
