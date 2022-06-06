const Comment = () => {
	return (
		<div className="comments-container">
			<h1>User Comments</h1>
			<ul id="comments-list" className="comments-list">
				<li>
					<div className="comment-main-level">
						<div className="comment-avatar">
							<image src="http://dummyimage.com/60" alt="" />
						</div>
						<div className="comment-box">
							<div className="comment-head">
								<h6 className="comment-name by-author">
									<a href="/column/">User Name</a>
								</h6>
								<span className="posted-time">Posted on 10-FEB-2015 12:00</span>
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

					<ul className="comments-list reply-list">
						<li>
							<div className="">
								<img className="avatar" src="https://unsplash.com/photos/wFN9B3s_iik" alt="" />
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
									Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et
									iure laudantium vitae, praesentium optio, sapiente distinctio illo?
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
						</li>

						<li>
							<div className="comment-avatar">
								<image src="http://dummyimage.com/60" alt="" />
							</div>

							<div className="comment-box">
								<div className="comment-head">
									<h6 className="comment-name by-author">
										<a href="/column/">User Name</a>
									</h6>
									<span className="posted-time">Posted on DD-MM-YYYY HH:MM</span>
									<i className="ri-facebook-line"></i>
									<i className="ri-service-fill"></i>
								</div>
								<div className="comment-content">
									Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et
									iure laudantium vitae, praesentium optio, sapiente distinctio illo?
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
						</li>
					</ul>
				</li>

				<li>
					<div className="comment-main-level">
						<div className="comment-avatar">
							<image src="http://dummyimage.com/60" alt="" />
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
				</li>
			</ul>
		</div>
	);
};

export default Comment;
