const UserController = require('../modules/user/userController');
module.exports = async (app) => {
    app.get(`/api/users/get/:PK`, UserController.findByID);
    app.get(`/api/users/getAll/`, UserController.getAll);
    app.post(`/api/users/create`, UserController.create);
    app.patch(`/api/users/edit/:PK`, UserController.update);
    app.delete(`/api/users/delete/:PK`, UserController.deleteByID);
};
