const UserService = require(`./userService`);
class UserController {
	async findByID(req, res) {
		const data = await UserService.findByID(req.params.id);
		res.json(data);
	}

	async getAll(req, res) {
		try {
			const data = await UserService.getAll();
			res.json(data);
		} catch (err) {
			console.error(err);
			res.status(500).json({err: 'Something went wrong'});
		}
	}

	async create(req, res) {
		const data = await UserService.create(req.body);
		res.json(data);
	}

	async update(req, res) {
		const data = await UserService.update(req.params.id, req.body);
		res.json(data);
	}

	async deleteByID(req, res) {
		try {
			await UserService.deleteByID(req.params.id);
			res.json('Delete user is success');
		} catch (err) {
			console.error(err);
			res.status(500).json({err: 'Something went wrong'});
		}
	}
}

module.exports = new UserController();
