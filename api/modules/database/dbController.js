const DBRepository = require('./dbRepository');

class DBController {
	async createTable(req, res) {
		try {
			const data = await DBRepository.createTable();
			res
				.status(200)
				.json(`Table ${data.TableDescription.TableName} is ${data.TableDescription.TableStatus}`);
		} catch (error) {
			res.status(500).json(error.message);
		}
	}

	async deleteTable(req, res) {
		try {
			const data = await DBRepository.deleteTable();
			res
				.status(200)
				.json(`Table ${data.TableDescription.TableName} is ${data.TableDescription.TableStatus}`);
		} catch (error) {
			res.status(500).json(error.message);
		}
	}

	async importData(req, res) {
		try {
			const data = await DBRepository.importData();
			res.status(200).json('Import Data in successfully');
		} catch (error) {
			res.status(500).json(error);
			console.log(error);
		}
	}

	async exportData(req, res) {
		try {
			await DBRepository.exportData();
			res.status(200).json('Export Data in successfully');
		} catch (error) {
			res.status(500).json(error);
		}
	}
}

module.exports = new DBController();
