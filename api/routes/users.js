const UserController = require('../modules/users/userController');
const {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
} = require('../middleware/verifyToken');
module.exports = async (app) => {
	app.get('/api/user/:id', verifyTokenAndAuthorization, UserController.findByID);
	app.get('/api/user/', UserController.getAll);
	app.post('/api/user/create/', UserController.create);
	app.patch('/api/user/edit/:id', UserController.update);
	app.delete('/api/user/delete/:id', UserController.deleteByID);
};
