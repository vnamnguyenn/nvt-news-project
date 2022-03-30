const PostController = require('../modules/posts/postController');
module.exports = async (app) => {
    app.get('/post/get/:id', PostController.findByID);
    app.get('/post/getAll/', PostController.getAll);
    app.post('/post/create/', PostController.create);
    app.patch('/post/edit/', PostController.update);
    app.delete('/post/delete/:id', PostController.deleteByID);
};
