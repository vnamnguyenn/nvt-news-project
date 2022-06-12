const DBController = require('../modules/database/dbController');

const {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
} = require('../middleware/verifyToken');

module.exports = async (app) => {
	app.post('/api/database/create', DBController.createTable);
	app.delete('/api/database/delete', DBController.deleteTable);
	app.post('/api/database/import_data', DBController.importData);
	app.get('/api/backup', DBController.getBackup);
	app.post('/api/backup/create', verifyTokenAndAdmin, DBController.createBackup);
	app.delete('/api/backup/delete/:backupId', verifyTokenAndAdmin, DBController.deleteBackup);
};
