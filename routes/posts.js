const PostController = require('../modules/posts/postController');
const {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
} = require('../middleware/verifyToken');
module.exports = async (app) => {
	app.get('/api/post/', PostController.getAll);
	app.get('/api/post/get_by_author/:authorId', PostController.getPostByAuthor);
	app.get('/api/search/', PostController.search);
	app.get('/api/post/:id', PostController.findByID);
	app.post('/api/post/create/', verifyTokenAndAdmin, PostController.create);
	app.patch('/api/post/edit/:postId', verifyTokenAndAdmin, PostController.update);
	app.delete('/api/post/delete/:postId', verifyTokenAndAdmin, PostController.deleteByID);
};
