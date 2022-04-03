const NewsLetter = () => {
	return (
		<section className="newsletter section">
			<div className="container">
				<h2 className="title section-title" data-name="Newsletter">
					Newsletter
				</h2>
				<div className="form-container-inner">
					<h6 className="title newsletter-title">Subscribe to our newsletter</h6>
					<p className="newsletter-description">
						Signup for our weekly newsletter to get the latest news, update and amazing offers delivered in your inbox
					</p>
					<form action="" className="form">
						<input className="form-input" type="text" required placeholder="Enter your email address" />
						<button className="btn form-btn" type="submit">
							<i className="ri-mail-send-line"></i>
						</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default NewsLetter;
