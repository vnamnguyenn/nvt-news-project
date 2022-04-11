const CategoryController = require('../modules/categories/categoryController');
const {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
} = require('../middleware/verifyToken');
module.exports = async (app) => {
	app.get('/category/:id', CategoryController.findByID);
	app.get('/category/', CategoryController.getAll);
	app.post('/category/create/',verifyTokenAndAdmin, CategoryController.create);
	app.patch('/category/edit/', CategoryController.update);
	app.delete('/category/delete/:id', CategoryController.deleteByID);
};
