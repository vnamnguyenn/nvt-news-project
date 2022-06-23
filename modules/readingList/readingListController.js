const ReadingListService = require(`./ReadingListService`);

class ReadingListController {
	async getAll(req, res) {
		try {
			const data = await ReadingListService.getAll(req.user.pk);
			res.json(data);
		} catch (err) {
			console.error(err);
			res.status(500).json({err: 'Something went wrong'});
		}
	}

	async create(req, res) {
		try {
			const data = await ReadingListService.create(req.user.pk, req.body);
			res.status(200).json(data);
		} catch (err) {
			console.error(err);
			res.status(500).json({err: 'Something went wrong'});
		}
	}

	async deleteByID(req, res) {
		try {
			const data = await ReadingListService.deleteByID(req.user.pk, req.params.SaveID);
			if (data) {
				res.json('Delete in successfully');
			}
		} catch (err) {
			console.error(err);
			res.status(500).json({err: 'Something went wrong'});
		}
	}
}

module.exports = new ReadingListController();
