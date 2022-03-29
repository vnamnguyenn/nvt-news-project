const Featured = () => {
	return (
		<div className="featured-content d-grid">
			<div className="headline-banner">
				<h3 className="headline fancy-border">
					<span className="place-items-center">Breaking news</span>
				</h3>
				<span className="headline-description">Apple announces a new partnership...</span>
			</div>

			<a href="./post.html" className="article featured-article featured-article-1">
				<img
					src="https://res.cloudinary.com/van-nam/image/upload/v1648531561/images/featured/featured-2_qhosxy.jpg"
					alt=""
					className="article-image"
				/>
				<span className="article-category">Technology</span>

				<div className="article-data-container">
					<div className="article-data">
						<span>Dec 5th 2021</span>
						<span className="article-data-spacer"></span>
						<span>8 Min read</span>
					</div>

					<h3 className="title article-title">Is VR the future?</h3>
				</div>
			</a>

			<a href="./post.html" className="article featured-article featured-article-2">
				<img
					src="https://res.cloudinary.com/van-nam/image/upload/v1648531546/images/featured/featured-3_jlxgsy.jpg"
					alt=""
					className="article-image"
				/>
				<span className="article-category">Food</span>

				<div className="article-data-container">
					<div className="article-data">
						<span>Dec 6th 2021</span>
						<span className="article-data-spacer"></span>
						<span>4 Min read</span>
					</div>

					<h3 className="title article-title">Fine dining 101</h3>
				</div>
			</a>

			<a href="./post.html" className="article featured-article featured-article-3">
				<img
					src="https://res.cloudinary.com/van-nam/image/upload/v1648531546/images/featured/featured-3_jlxgsy.jpg"
					alt=""
					className="article-image"
				/>
				<span className="article-category">Health</span>

				<div className="article-data-container">
					<div className="article-data">
						<span>Dec 5th 2021</span>
						<span className="article-data-spacer"></span>
						<span>5 Min read</span>
					</div>

					<h3 className="title article-title">Natural fat burner</h3>
				</div>
			</a>
		</div>
	);
};

export default Featured;
