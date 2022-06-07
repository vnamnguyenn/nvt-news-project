const Reply = () => {
	return (
		<li>
			<div className="comment-avatar">
				<img src="https://unsplash.com/photos/wFN9B3s_iik" alt="" />
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
		</li>
	);
};

export default Reply;
