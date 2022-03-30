const UserController = require('../modules/users/userController');
module.exports = async (app) => {
    app.get('/user/get/:id', UserController.findByID);
    app.get('/user/getAll/', UserController.getAll);
    app.post('/user/create/', UserController.create);
    app.patch('/user/edit/', UserController.update);
    app.delete('/user/delete/:id', UserController.deleteByID);
};
