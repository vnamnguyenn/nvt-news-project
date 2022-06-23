const ReadingListController = require('../modules/readingList/readingListController');
const {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
} = require('../middleware/verifyToken');
module.exports = async (app) => {
	app.get('/api/reading_list/', verifyToken, ReadingListController.getAll);
	app.post('/api/reading_list/create/', verifyToken, ReadingListController.create);
	app.delete('/api/reading_list/delete/:SaveID', verifyToken, ReadingListController.deleteByID);
};
