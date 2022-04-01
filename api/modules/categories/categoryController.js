const CategoryService = require(`./categoryService`);

class CategoryController {
	async findByID(req, res) {
		try {
			const data = await CategoryService.findByID(req.params.id);
			res.status(200).json(data);
		} catch (err) {
			console.error(err);
			res.status(500).json({err: 'Something went wrong'});
		}
	}

	async getAll(req, res) {
		try {
			const data = await CategoryService.getAll();
			res.json(data);
		} catch (err) {
			console.error(err);
			res.status(500).json({err: 'Something went wrong'});
		}
	}

	async create(req, res) {
		try {
			const data = await CategoryService.create(req.body);
			res.status(200).json(data);
		} catch (err) {
			console.error(err);
			res.status(500).json({err: 'Something went wrong'});
		}
	}

	async update(req, res) {
		try {
			const data = await CategoryService.update(req.body);
			res.status(200).json(data);
		} catch (err) {
			console.error(err);
			res.status(500).json({err: 'Something went wrong'});
		}
	}

	async deleteByID(req, res) {
		try {
			await CategoryService.deleteByID(req.params.id);
			res.json('Delete is success');
		} catch (err) {
			console.error(err);
			res.status(500).json({err: 'Something went wrong'});
		}
	}
}

module.exports = new CategoryController();
