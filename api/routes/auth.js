const AuthController = require('../modules/auth/authController');
module.exports = async (app) => {
    app.get('/signin', AuthController.signin);
    app.post('/signup', AuthController.signup);
};
