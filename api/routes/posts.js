const PostController = require('../modules/posts/postController');
const {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin} = require("../middleware/verifyToken");
module.exports = async (app) => {
    app.get('/api/post/:id', PostController.findByID);
    app.get('/api/post/', PostController.getAll);
    app.post('/api/post/create/',verifyToken, PostController.create);
    app.patch('/api/post/edit/', PostController.update);
    app.delete('/api/post/delete/:id', PostController.deleteByID);
};
