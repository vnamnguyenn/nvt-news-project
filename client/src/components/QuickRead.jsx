import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination, Navigation} from 'swiper';
import {publicRequest} from '../requestMethods';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Quickread = () => {
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		const fetchPosts = async () => {
			const res = await publicRequest.get('/post/featured_article');
			setPosts(res.data);
		};
		fetchPosts();
	}, []);
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
						{posts.map((p) => (
							<SwiperSlide key={p.PostID} className="article swiper-slide">
								<Link to={`post/${p.PostID}`}>
									<img src={p.Thumbnail} alt="" className="article-image" />
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
