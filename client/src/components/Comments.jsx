import {useState, useEffect} from 'react';
import {publicRequest, userRequest} from '../requestMethods';
import CommentForm from './CommentForm';
import Comment from './Comment';
import {toast} from 'react-toastify';

const Comments = ({postID, postAuthorID}) => {
	const [backendComments, setBackendComments] = useState([]);
	const [activeComment, setActiveComment] = useState(null);
	const rootComments = backendComments.filter(
		(backendComment) => backendComment.ParentCommentId === null,
	);

	const getReplies = (commentId) => {
		return backendComments
			.filter((backendComment) => backendComment.ParentCommentId === commentId)
			.sort((a, b) => new Date(a.CreatedDate).getTime() - new Date(b.CreatedDate).getTime());
	};

	const addComment = async (text, parentId) => {
		try {
			await userRequest
				.post('/comment/create/', {
					ParentPostID: postID,
					CommentContent: text,
					ParentCommentId: parentId === undefined ? null : parentId,
				})
				.then((comment) => setBackendComments([comment.data, ...backendComments]));
			setActiveComment(null);
			toast.success('Add Comment in successfully', {
				position: 'bottom-right',
				autoClose: 2500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
		} catch (error) {
			toast.error('Create new comment is Failed', {
				position: 'bottom-right',
				autoClose: 2500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
		}
	};

	const updateComment = async (text, commentId) => {
		try {
			await userRequest
				.patch('/comment/edit/' + commentId, {
					CommentContent: text,
				})
				.then(() => {
					const updateBackendComments = backendComments.map((backendComment) => {
						if (backendComment.CommentId === commentId) {
							return {...backendComment, CommentContent: text};
						}

						return backendComment;
					});

					setBackendComments(updateBackendComments);
					setActiveComment(null);
				});
			toast.success('You comment is updated', {
				position: 'bottom-right',
				autoClose: 2500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
		} catch (error) {
			toast.error('Comment update is Failed', {
				position: 'bottom-right',
				autoClose: 2500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
		}
	};

	const deleteComment = async (commentId) => {
		if (window.confirm('Are you sure that you want to remove comment?')) {
			try {
				await userRequest.delete('/comment/delete/' + commentId).then(() => {
					const updateBackendComments = backendComments.filter(
						(backendComment) => backendComment.CommentId !== commentId,
					);
					setBackendComments(updateBackendComments);
				});
				toast.success('Delete Comment in successfully', {
					position: 'bottom-right',
					autoClose: 2500,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: false,
					progress: undefined,
				});
			} catch (error) {
				toast.error('Delete comment is Failed', {
					position: 'bottom-right',
					autoClose: 2500,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: false,
					progress: undefined,
				});
			}
		}
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
			<CommentForm submitLabel="Write" handleSubmit={addComment} />
			<h2>Comments ({rootComments.length})</h2>
			<ul id="comments-list" className="comments-list">
				{rootComments.map((rootComment) => (
					<Comment
						key={rootComment.CommentId}
						replies={getReplies(rootComment.CommentId)}
						comment={rootComment}
						deleteComment={deleteComment}
						activeComment={activeComment}
						setActiveComment={setActiveComment}
						addComment={addComment}
						updateComment={updateComment}
						postAuthor={postAuthorID}
					/>
				))}
			</ul>
		</div>
	);
};

export default Comments;
