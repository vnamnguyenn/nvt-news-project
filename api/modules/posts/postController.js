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

	async featuredArticles(req, res) {
		try {
			const data = await PostService.featuredArticles();
			res.json(data);
		} catch (err) {
			console.error(err);
			res.status(500).json({err: 'Something went wrong'});
		}
	}

	async trendingNews(req, res) {
		try {
			const data = await PostService.trendingNews();
			res.json(data);
		} catch (err) {
			console.error(err);
			res.status(500).json({err: 'Something went wrong'});
		}
	}
	async olderPost(req, res) {
		try {
			const data = await PostService.olderPost();
			res.json(data);
		} catch (err) {
			console.error(err);
			res.status(500).json({err: 'Something went wrong'});
		}
	}

	async quickRead(req, res) {
		try {
			const data = await PostService.quickRead();
			res.json(data);
		} catch (err) {
			console.error(err);
			res.status(500).json({err: 'Something went wrong'});
		}
	}

	async create(req, res) {
		try {
			const data = await PostService.create(req.user.pk, req.body);
			res.status(200).json(data);
		} catch (err) {
			console.error(err);
			res.status(500).json({err: 'Something went wrong'});
		}
	}

	async update(req, res) {
		try {
			const data = await PostService.update(req.user.pk, req.params.postId, req.body);
			res.status(200).json(data);
		} catch (err) {
			res.status(500).json(err);
		}
	}

	async deleteByID(req, res) {
		try {
			const data = await PostService.deleteByID(req.user.pk, req.params.postId);
			if (data) {
				res.status(200).json(req.user);
			}
		} catch (err) {
			console.error(err);
			res.status(500).json({err: 'Something went wrong'});
		}
	}
}

module.exports = new PostController();
