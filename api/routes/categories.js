const CategoryController = require('../modules/categories/categoryController');
const {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
} = require('../middleware/verifyToken');
module.exports = async (app) => {
	app.get('/api/category/:id', CategoryController.findByID);
	app.get('/api/category/', CategoryController.getAll);
	app.post('/api/category/create/',verifyTokenAndAdmin, CategoryController.create);
	app.patch('/api/category/edit/', CategoryController.update);
	app.delete('/api/category/delete/:id', CategoryController.deleteByID);
};
