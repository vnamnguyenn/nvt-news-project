const PostController = require('../modules/posts/postController');
const {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
} = require('../middleware/verifyToken');
module.exports = async (app) => {
	app.get('/api/post/quick_read', PostController.quickRead);
	app.get('/api/post/featured_article', PostController.featuredArticles);
	app.get('/api/post/older_post', PostController.olderPost);
	app.get('/api/post/trending_news', PostController.trendingNews);
	app.get('/api/post/', PostController.getAll);
	app.get('/api/post/:id', PostController.findByID);
	app.post('/api/post/create/', verifyTokenAndAdmin, PostController.create);
	app.patch('/api/post/edit/:postId', verifyTokenAndAdmin, PostController.update);
	app.delete('/api/post/delete/:postId', verifyTokenAndAdmin, PostController.deleteByID);
};
