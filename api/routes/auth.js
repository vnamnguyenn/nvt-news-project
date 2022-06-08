const AuthController = require('../modules/auth/authController');
const {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
} = require('../middleware/verifyToken');
module.exports = async (app) => {
	app.post('/api/signin', AuthController.signin);
	app.post('/api/signup', AuthController.signup);
	app.get('/api/auth/profile', verifyToken, AuthController.findByID);
	app.patch('/api/auth/update_profile', verifyToken, AuthController.updateByID);
};
