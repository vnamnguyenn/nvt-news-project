const commentController = require('../modules/comments/commentController');
const {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
} = require('../middleware/verifyToken');
module.exports = async (app) => {
	app.post('/api/comment/create/', verifyToken, commentController.create);
	app.get('/api/comment/get_comment/:postID', commentController.getComment);
};
