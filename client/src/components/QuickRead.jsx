import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination, Navigation} from 'swiper';
import {baseImageUrl, publicRequest} from '../requestMethods';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Quickread = ({data}) => {
	const posts = data.slice(data.length - 7, data.length - 1).reverse();

	return (
		<section className="quick-read section">
			<div className="container">
				<h2 className="title section-title" data-name="Quick read">
					Quick read
				</h2>
				{/* Slider main container */}
				<Swiper
					slidesPerView={3}
					spaceBetween={10}
					slidesPerGroup={1}
					loop={true}
					loopFillGroupWithBlank={true}
					pagination={{
						clickable: true,
					}}
					navigation={true}
					modules={[Pagination, Navigation]}
					className="swiper"
					breakpoints={{
						// when window width is >= 320px
						320: {
							slidesPerView: 1,
							spaceBetween: 10,
						},
						// when window width is >= 480px
						480: {
							slidesPerView: 3,
							spaceBetween: 30,
						},
						// when window width is >= 640px
						640: {
							slidesPerView: 4,
							spaceBetween: 40,
						},
					}}
				>
					{/* Additional required wrapper */}
					<div className="swiper-wrapper">
						{posts.map((p) => (
							<SwiperSlide key={p.PostID} className="article swiper-slide">
								<Link to={`post/${p.PostID}`}>
									<img src={baseImageUrl + p.Thumbnail} alt="" className="article-image" />
									<div className="article-data-container">
										<div className="article-data">
											<span>{p.PublishedDate}</span>
											<span className="article-data-spacer"></span>
											<span>{p.ReadingTime} Min read</span>
										</div>
										<h3 className="title article-title">{p.PostTitle}</h3>
									</div>
								</Link>
							</SwiperSlide>
						))}
					</div>
				</Swiper>
			</div>
		</section>
	);
};

export default Quickread;
