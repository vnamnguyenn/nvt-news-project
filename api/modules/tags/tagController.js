const TagService = require(`./tagService`);

class TagController {
	async findByID(req, res) {
		try {
			const data = await TagService.findByID(req.params.id);
			res.status(200).json(data);
		} catch (err) {
			console.error(err);
			res.status(500).json({err: 'Something went wrong'});
		}
	}

	async getAll(req, res) {
		try {
			const data = await TagService.getAll();
			res.json(data);
		} catch (err) {
			console.error(err);
			res.status(500).json({err: 'Something went wrong'});
		}
	}

	async create(req, res) {
		try {
			const data = await TagService.create(req.user.pk, req.body);
			res.status(200).json(data);
		} catch (err) {
			console.error(err);
			res.status(500).json({err: 'Something went wrong'});
		}
	}

	async update(req, res) {
		try {
			const data = await TagService.update(req.user.pk, req.params.tagId, req.body);
			res.status(200).json(data);
		} catch (err) {
			console.error(err);
			res.status(500).json({err: 'Something went wrong'});
		}
	}

	async deleteByID(req, res) {
		try {
			await TagService.deleteByID(req.user.pk, req.params.tagId);
			res.status(200).json('Delete is success');
		} catch (err) {
			console.error(err);
			res.status(500).json({err: 'Something went wrong'});
		}
	}
}

module.exports = new TagController();
