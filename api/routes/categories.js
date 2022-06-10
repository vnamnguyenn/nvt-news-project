const CategoryController = require('../modules/categories/categoryController');
const {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
} = require('../middleware/verifyToken');
module.exports = async (app) => {
	app.get('/api/category/:categoryId', CategoryController.findByID);
	app.get('/api/category/', CategoryController.getAll);
	app.post('/api/category/create/', verifyTokenAndAdmin, CategoryController.create);
	app.patch('/api/category/edit/:categoryId', verifyTokenAndAdmin, CategoryController.update);
	app.delete(
		'/api/category/delete/:categoryId',
		verifyTokenAndAdmin,
		CategoryController.deleteByID,
	);
};
