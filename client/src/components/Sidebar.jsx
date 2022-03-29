
const Sidebar = () => {
	return (
		<div className="sidebar d-grid">
			<h3 className="title featured-content-title">Trending news</h3>

			<a href="/#" className="trending-news-box">
				<div className="trending-news-img-box">
					<span className="trending-number place-items-center">01</span>
					<img
						src="https://res.cloudinary.com/van-nam/image/upload/v1648531550/images/trending/trending_1_oxcpvw.jpg"
						alt=""
						className="article-image"
					/>
				</div>

				<div className="trending-news-data">
					<div className="article-data">
						<span>23 Dec 2021</span>
						<span className="article-data-spacer"></span>
						<span>3 Min read</span>
					</div>

					<h3 className="title article-title">Sample article title</h3>
				</div>
			</a>

			<a href="/#" className="trending-news-box">
				<div className="trending-news-img-box">
					<span className="trending-number place-items-center">02</span>
					<img
						src="https://res.cloudinary.com/van-nam/image/upload/v1648531579/images/trending/trending_2_vq63hq.jpg"
						alt=""
						className="article-image"
					/>
				</div>

				<div className="trending-news-data">
					<div className="article-data">
						<span>23 Dec 2021</span>
						<span className="article-data-spacer"></span>
						<span>3 Min read</span>
					</div>

					<h3 className="title article-title">Sample article title</h3>
				</div>
			</a>

			<a href="/#" className="trending-news-box">
				<div className="trending-news-img-box">
					<span className="trending-number place-items-center">03</span>
					<img
						src="https://res.cloudinary.com/van-nam/image/upload/v1648531573/images/trending/trending_3_nej6xg.jpg"
						alt=""
						className="article-image"
					/>
				</div>

				<div className="trending-news-data">
					<div className="article-data">
						<span>23 Dec 2021</span>
						<span className="article-data-spacer"></span>
						<span>3 Min read</span>
					</div>

					<h3 className="title article-title">Sample article title</h3>
				</div>
			</a>

			<a href="/#" className="trending-news-box">
				<div className="trending-news-img-box">
					<span className="trending-number place-items-center">04</span>
					<img
						src="https://res.cloudinary.com/van-nam/image/upload/v1648531577/images/trending/trending_4_e57bvp.jpg"
						alt=""
						className="article-image"
					/>
				</div>

				<div className="trending-news-data">
					<div className="article-data">
						<span>23 Dec 2021</span>
						<span className="article-data-spacer"></span>
						<span>3 Min read</span>
					</div>

					<h3 className="title article-title">Sample article title</h3>
				</div>
			</a>

			<a href="/#" className="trending-news-box">
				<div className="trending-news-img-box">
					<span className="trending-number place-items-center">05</span>
					<img
						src="https://res.cloudinary.com/van-nam/image/upload/v1648531575/images/trending/trending_5_n5vz7v.jpg"
						alt=""
						className="article-image"
					/>
				</div>

				<div className="trending-news-data">
					<div className="article-data">
						<span>23 Dec 2021</span>
						<span className="article-data-spacer"></span>
						<span>3 Min read</span>
					</div>

					<h3 className="title article-title">Sample article title</h3>
				</div>
			</a>
		</div>
	);
};

export default Sidebar;
