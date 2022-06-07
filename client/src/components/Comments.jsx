import {useState, useEffect} from 'react';
import {publicRequest, userRequest} from '../requestMethods';
import AddComment from './AddComment';
import Comment from './Comment';

const Comments = ({postID}) => {
	const [backendComments, setBackendComments] = useState([]);
	const rootComments = backendComments.filter(
		(backendComment) => backendComment.ParentCommentId === null,
	);

	const getReplies = (commentId) => {
		return backendComments
			.filter((backendComment) => backendComment.ParentCommentId === commentId)
			.sort((a, b) => new Date(a.CreatedDate).getTime() - new Date(b.CreatedDate).getTime());
	};

	const addComment = async (text, parentId) => {
		console.log('submit', text, parentId);
		await userRequest
			.post('/comment/create/', {
				ParentPostID: postID,
				CommentContent: text,
				ParentCommentId: parentId === undefined ? null : parentId,
			})
			.then((comment) => setBackendComments([comment.data, ...backendComments]));
		console.log(backendComments);
	};

	useEffect(() => {
		const getComment = async () => {
			const res = await publicRequest.get('/comment/get_comment/' + postID);
			setBackendComments(res.data);
		};
		getComment();
	}, [postID]);

	return (
		<div className="create-comment">
			<AddComment submitLabel="Write" handleSubmit={addComment} />
			<h2>User Comments ({rootComments.length})</h2>
			<ul id="comments-list" className="comments-list">
				{rootComments.map((rootComment) => (
					<Comment
						key={rootComment.CommentId}
						replies={getReplies(rootComment.CommentId)}
						comment={rootComment}
					/>
				))}
			</ul>
		</div>
	);
};

export default Comments;
