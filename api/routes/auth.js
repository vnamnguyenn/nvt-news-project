const AuthController = require('../modules/auth/authController');
module.exports = async (app) => {
    app.post('/api/signin', AuthController.signin);
    app.post('/api/signup', AuthController.signup);
    // app.post('/api/update_password', AuthController.updatePassword);
    // app.post('/api/update_profile', AuthController.updateProfile);
};
