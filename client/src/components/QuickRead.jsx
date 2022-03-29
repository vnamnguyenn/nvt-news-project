const Quickread = () => {
	return (
		<section className="quick-read section">
			<div className="container">
				<h2 className="title section-title" data-name="Quick read">
					Quick read
				</h2>
				{/* Slider main container */}
				<div className="swiper">
					{/* Additional required wrapper */}
					<div className="swiper-wrapper">
						{/* Slides */}
						<a href="/#" className="article swiper-slide">
							<img
								src="https://res.cloudinary.com/van-nam/image/upload/v1648531563/images/quick_read/quick_read_1_hjylk9.jpg"
								alt=""
								className="article-image"
							/>

							<div className="article-data-container">
								<div className="article-data">
									<span>23 Dec 2021</span>
									<span className="article-data-spacer"></span>
									<span>3 Min read</span>
								</div>
								<h3 className="title article-title">Sample article title</h3>
							</div>
						</a>
						{/* Slides */}
						<a href="/#" className="article swiper-slide">
							<img
								src="https://res.cloudinary.com/van-nam/image/upload/v1648531569/images/quick_read/quick_read_2_gunqr2.jpg"
								alt=""
								className="article-image"
							/>

							<div className="article-data-container">
								<div className="article-data">
									<span>23 Dec 2021</span>
									<span className="article-data-spacer"></span>
									<span>3 Min read</span>
								</div>
								<h3 className="title article-title">Sample article title</h3>
							</div>
						</a>
						{/* Slides */}
						<a href="/#" className="article swiper-slide">
							<img
								src="https://res.cloudinary.com/van-nam/image/upload/v1648531545/images/quick_read/quick_read_3_rjl1eu.jpg"
								alt=""
								className="article-image"
							/>

							<div className="article-data-container">
								<div className="article-data">
									<span>23 Dec 2021</span>
									<span className="article-data-spacer"></span>
									<span>3 Min read</span>
								</div>
								<h3 className="title article-title">Sample article title</h3>
							</div>
						</a>
						{/* Slides */}
						<a href="/#" className="article swiper-slide">
							<img
								src="https://res.cloudinary.com/van-nam/image/upload/v1648531571/images/quick_read/quick_read_4_q5qd6u.jpg"
								alt=""
								className="article-image"
							/>

							<div className="article-data-container">
								<div className="article-data">
									<span>23 Dec 2021</span>
									<span className="article-data-spacer"></span>
									<span>3 Min read</span>
								</div>
								<h3 className="title article-title">Sample article title</h3>
							</div>
						</a>
						{/* Slides */}
						<a href="/#" className="article swiper-slide">
							<img
								src="https://res.cloudinary.com/van-nam/image/upload/v1648531542/images/quick_read/quick_read_5_hlr8el.jpg"
								alt=""
								className="article-image"
							/>

							<div className="article-data-container">
								<div className="article-data">
									<span>23 Dec 2021</span>
									<span className="article-data-spacer"></span>
									<span>3 Min read</span>
								</div>
								<h3 className="title article-title">Sample article title</h3>
							</div>
						</a>
						{/* Slides */}
						<a href="/#" className="article swiper-slide">
							<img
								src="https://res.cloudinary.com/van-nam/image/upload/v1648531567/images/quick_read/quick_read_6_iudez2.jpg"
								alt=""
								className="article-image"
							/>

							<div className="article-data-container">
								<div className="article-data">
									<span>23 Dec 2021</span>
									<span className="article-data-spacer"></span>
									<span>3 Min read</span>
								</div>
								<h3 className="title article-title">Sample article title</h3>
							</div>
						</a>
					</div>
					{/* Navigation buttons  */}
					<div className="swiper-button-prev swiper-controls"></div>
					<div className="swiper-button-next swiper-controls"></div>
					{/* Pagination  */}
					<div className="swiper-pagination"></div>
				</div>
			</div>
		</section>
	);
};

export default Quickread;
