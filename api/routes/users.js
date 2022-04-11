const UserController = require('../modules/users/userController');
const {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
} = require('../middleware/verifyToken');
module.exports = async (app) => {
	app.get('/user/:id', verifyTokenAndAuthorization, UserController.findByID);
	app.get('/user/', UserController.getAll);
	app.post('/user/create/', UserController.create);
	app.patch('/user/edit/:id', UserController.update);
	app.delete('/user/delete/:id', UserController.deleteByID);
};
