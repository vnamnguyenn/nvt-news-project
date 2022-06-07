import {useSelector} from 'react-redux';
import ReactTooltip from 'react-tooltip';

const Comment = ({comment, replies}) => {
	const currentUser = useSelector((state) => state.user.currentUser);
	const canReply = Boolean(currentUser == null ? currentUser : currentUser.exportData.AccountId);

	return (
		<div className="create-comment">
			<ul id="comments-list" className="comments-list">
				<li key={comment.CommentId}>
					<div className="comment-main-level">
						<div className="comment-avatar">
							<img
								src="{rootComment.AccountInfo.Avatar} {rootComment.AccountInfo.FullName}"
								alt=""
							/>
						</div>
						<div className="comment-box">
							<div className="comment-head">
								<h6 className="comment-name by-author">
									<a href="/column/">Van Nam</a>
								</h6>
								<span className="posted-time">{comment.CreatedDate}</span>

								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
									<path fill="none" d="M0 0h24v24H0z" />
									<path d="M13.576 17.271l-5.11-2.787a3.5 3.5 0 1 1 0-4.968l5.11-2.787a3.5 3.5 0 1 1 .958 1.755l-5.11 2.787a3.514 3.514 0 0 1 0 1.458l5.11 2.787a3.5 3.5 0 1 1-.958 1.755z" />
								</svg>
								{/* sharing */}
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
									<path fill="none" d="M0 0h24v24H0z" />
									<path d="M14.6 8H21a2 2 0 0 1 2 2v2.104a2 2 0 0 1-.15.762l-3.095 7.515a1 1 0 0 1-.925.619H2a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1h3.482a1 1 0 0 0 .817-.423L11.752.85a.5.5 0 0 1 .632-.159l1.814.907a2.5 2.5 0 0 1 1.305 2.853L14.6 8zM7 10.588V19h11.16L21 12.104V10h-6.4a2 2 0 0 1-1.938-2.493l.903-3.548a.5.5 0 0 0-.261-.571l-.661-.33-4.71 6.672c-.25.354-.57.644-.933.858zM5 11H3v8h2v-8z" />
								</svg>
								{/* like */}
							</div>
							<div className="comment-content">
								{comment.CommentContent}
								<div className="comment-open">
									{canReply && (
										<a href="/column/" className="btn-reply">
											<svg
												data-tip="Reply comment"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												width="18"
												height="18"
											>
												<path fill="none" d="M0 0H24V24H0z" />
												<path d="M11 20L1 12l10-8v5c5.523 0 10 4.477 10 10 0 .273-.01.543-.032.81C19.46 16.95 16.458 15 13 15h-2v5z" />
											</svg>
										</a>
									)}
								</div>
							</div>
							<div className="comment-footer">
								<div className="comment-form">
									<textarea className="form-control" name="" id=""></textarea>
									<div className="pull-right send-button">
										<a href="/column/" className="btn-send">
											send
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
					{replies.length > 0 && (
						<ul className="comments-list reply-list">
							{replies.map((reply) => (
								<Comment key={reply.CommentId} replies={[]} comment={reply} />
							))}
						</ul>
					)}

					<ReactTooltip />
				</li>

				{/* <li>
				<div className="comment-main-level">
					<div className="comment-avatar">
						<img src="http://dummyimg.com/60" alt="" />
					</div>

					<div className="comment-box">
						<div className="comment-head">
							<h6 className="comment-name">
								<a href="/column/">Lorena Rojero</a>
							</h6>
							<span className="posted-time">Posted on DD-MM-YYYY HH:MM</span>
							<i className="ri-facebook-line"></i>
							<i className="ri-service-fill"></i>
						</div>
						<div className="comment-content">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure
							laudantium vitae, praesentium optio, sapiente distinctio illo?
							<div className="comment-open">
								<a href="/column/" className="btn-reply">
									<i className="ri-reply-fill"></i>
								</a>
							</div>
						</div>
						<div className="comment-footer">
							<div className="comment-form">
								<textarea className="form-control" name="" id=""></textarea>
								<div className="pull-right send-button">
									<a href="/column/" className="btn-send">
										send
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</li> */}
			</ul>
		</div>
	);
};

export default Comment;
