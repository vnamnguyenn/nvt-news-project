const UserController = require('../modules/user/userController');
module.exports = async (app) => {
    app.get(`/api/v1/users/:PK`, UserController.findByID);
    app.post(`/api/v1/users`, UserController.create);
    app.patch(`/api/users/:UserID`, UserController.update);
    app.delete(`/api/users/:UserID`, UserController.deleteByID);
};
