const DBController = require('../modules/database/dbController');

const {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
} = require('../middleware/verifyToken');

module.exports = async (app) => {
	app.post('/api/database/create/', DBController.createTable);
	app.post('/api/database/import_data/', DBController.importData);
	app.post('/api/database/export_data/', DBController.exportData);
	app.delete('/api/database/delete/', DBController.deleteTable);
};
