const TagController = require('../modules/tags/tagController');
const {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
} = require('../middleware/verifyToken');
module.exports = async (app) => {
	app.get('/api/tag/:id', TagController.findByID);
	app.get('/api/tag/', TagController.getAll);
	app.post('/api/tag/create/', verifyTokenAndAdmin, TagController.create);
	app.patch('/api/tag/edit/:tagId', verifyTokenAndAdmin, TagController.update);
	app.delete('/api/tag/delete/:tagId', verifyTokenAndAdmin, TagController.deleteByID);
};
