import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination, Navigation} from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Quickread = () => {
	// Swiper
	// const swiper = new Swiper('.swiper', {
	// 	// How many slides to show
	// 	slidesPerView: 1,
	// 	// How much space between slides
	// 	spaceBetween: 20,
	// 	// Make the next and previous buttons work
	// 	navigation: {
	// 		nextEl: '.swiper-button-next',
	// 		prevEl: '.swiper-button-prev',
	// 	},
	// 	// Make the pagination indicators work
	// 	pagination: {
	// 		el: '.swiper-pagination',
	// 	},
	// 	//Responsive breakpoints for how many slides to show at that view
	// 	breakpoints: {
	// 		// 700px and up shoes 2 slides
	// 		700: {
	// 			slidesPerView: 2,
	// 		},
	// 		// 1200px and up shoes 3 slides
	// 		1200: {
	// 			slidesPerView: 3,
	// 		},
	// 	},
	// });
	return (
		<section className="quick-read section">
			<div className="container">
				<h2 className="title section-title" data-name="Quick read">
					Quick read
				</h2>
				{/* Slider main container */}
				<Swiper
					slidesPerView={3}
					spaceBetween={30}
					slidesPerGroup={1}
					loop={true}
					loopFillGroupWithBlank={true}
					pagination={{
						clickable: true,
					}}
					navigation={true}
					modules={[Pagination, Navigation]}
					className="swiper"
				>
					{/* Additional required wrapper */}
					<div className="swiper-wrapper">
						{/* Slides */}
						<SwiperSlide href="/#" className="article swiper-slide">
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
						</SwiperSlide>
						{/* Slides */}
						<SwiperSlide href="/#" className="article swiper-slide">
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
						</SwiperSlide>
						{/* Slides */}
						<SwiperSlide href="/#" className="article swiper-slide">
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
						</SwiperSlide>
						{/* Slides */}
						<SwiperSlide href="/#" className="article swiper-slide">
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
						</SwiperSlide>
						{/* Slides */}
						<SwiperSlide href="/#" className="article swiper-slide">
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
						</SwiperSlide>
						{/* Slides */}
						<SwiperSlide href="/#" className="article swiper-slide">
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
						</SwiperSlide>
					</div>
				</Swiper>
			</div>
		</section>
	);
};

export default Quickread;
