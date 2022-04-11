const TagController = require('../modules/tags/tagController');
const {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
} = require('../middleware/verifyToken');
module.exports = async (app) => {
	app.get('/tag/:id', TagController.findByID);
	app.get('/tag/', TagController.getAll);
	app.get('/popular_tag/', TagController.popularTag);
	app.post('/tag/create/',verifyTokenAndAdmin, TagController.create);
	app.patch('/tag/edit/', TagController.update);
	app.delete('/tag/delete/:id', TagController.deleteByID);
};
