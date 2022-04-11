const PostController = require('../modules/posts/postController');
const {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
} = require('../middleware/verifyToken');
module.exports = async (app) => {
	app.get('/post/quick_read', PostController.quickRead);
	app.get('/post/featured_article', PostController.featuredArticles);
	app.get('/post/older_post', PostController.olderPost);
	app.get('/post/trending_news', PostController.trendingNews);
	app.get('/post/', PostController.getAll);
	app.get('/search/:title', PostController.search);
	app.get('/post/:id', PostController.findByID);
	app.post('/post/create/', verifyTokenAndAdmin, PostController.create);
	app.patch('/post/edit/:postId', verifyTokenAndAdmin, PostController.update);
	app.delete('/post/delete/:postId', verifyTokenAndAdmin, PostController.deleteByID);
};
