import React from 'react';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
// import {Link} from 'react-router-dom';

const NewsList = () => {
	return (
		<div>
			<Header />
            <section className="older-posts section section-header-offset">
			<div className="container">

				<div className="older-posts-grid-wrapper d-grid">
					<a href="/#" className="article d-grid">
						<div className="older-posts-article-image-wrapper">
							<img
								src="https://res.cloudinary.com/van-nam/image/upload/v1648531532/images/older_posts/older_posts_1_d5ghnd.jpg"
								alt=""
								className="article-image"
							/>
						</div>

						<div className="article-data-container">
							<div className="article-data">
								<span>23 Dec 2021</span>
								<span className="article-data-spacer"></span>
								<span>3 Min read</span>
							</div>

							<h3 className="title article-title">Sample article title</h3>
							<p className="article-description">
								Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique a tempore
								sapiente corporis, eaque fuga placeat odit voluptatibus.
							</p>
						</div>
					</a>

					<a href="/#" className="article d-grid">
						<div className="older-posts-article-image-wrapper">
							<img
								src="https://res.cloudinary.com/van-nam/image/upload/v1648531534/images/older_posts/older_posts_2_jbgfj0.jpg"
								alt=""
								className="article-image"
							/>
						</div>

						<div className="article-data-container">
							<div className="article-data">
								<span>23 Dec 2021</span>
								<span className="article-data-spacer"></span>
								<span>3 Min read</span>
							</div>

							<h3 className="title article-title">Sample article title</h3>
							<p className="article-description">
								Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique a tempore
								sapiente corporis, eaque fuga placeat odit voluptatibus.
							</p>
						</div>
					</a>

					<a href="/#" className="article d-grid">
						<div className="older-posts-article-image-wrapper">
							<img
								src="https://res.cloudinary.com/van-nam/image/upload/v1648531528/images/older_posts/older_posts_3_wuen6h.jpg"
								alt=""
								className="article-image"
							/>
						</div>

						<div className="article-data-container">
							<div className="article-data">
								<span>23 Dec 2021</span>
								<span className="article-data-spacer"></span>
								<span>3 Min read</span>
							</div>

							<h3 className="title article-title">Sample article title</h3>
							<p className="article-description">
								Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique a tempore
								sapiente corporis, eaque fuga placeat odit voluptatibus.
							</p>
						</div>
					</a>

					<a href="/#" className="article d-grid">
						<div className="older-posts-article-image-wrapper">
							<img
								src="https://res.cloudinary.com/van-nam/image/upload/v1648531536/images/older_posts/older_posts_4_f1qbty.jpg"
								alt=""
								className="article-image"
							/>
						</div>

						<div className="article-data-container">
							<div className="article-data">
								<span>23 Dec 2021</span>
								<span className="article-data-spacer"></span>
								<span>3 Min read</span>
							</div>

							<h3 className="title article-title">Sample article title</h3>
							<p className="article-description">
								Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique a tempore
								sapiente corporis, eaque fuga placeat odit voluptatibus.
							</p>
						</div>
					</a>

					<a href="/#" className="article d-grid">
						<div className="older-posts-article-image-wrapper">
							<img
								src="https://res.cloudinary.com/van-nam/image/upload/v1648531540/images/older_posts/older_posts_5_mfankh.jpg"
								alt=""
								className="article-image"
							/>
						</div>

						<div className="article-data-container">
							<div className="article-data">
								<span>23 Dec 2021</span>
								<span className="article-data-spacer"></span>
								<span>3 Min read</span>
							</div>

							<h3 className="title article-title">Sample article title</h3>
							<p className="article-description">
								Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique a tempore
								sapiente corporis, eaque fuga placeat odit voluptatibus.
							</p>
						</div>
					</a>

					<a href="/#" className="article d-grid">
						<div className="older-posts-article-image-wrapper">
							<img
								src="https://res.cloudinary.com/van-nam/image/upload/v1648531559/images/older_posts/older_posts_6_vv4jzy.jpg"
								alt=""
								className="article-image"
							/>
						</div>

						<div className="article-data-container">
							<div className="article-data">
								<span>23 Dec 2021</span>
								<span className="article-data-spacer"></span>
								<span>3 Min read</span>
							</div>

							<h3 className="title article-title">Sample article title</h3>
							<p className="article-description">
								Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique a tempore
								sapiente corporis, eaque fuga placeat odit voluptatibus.
							</p>
						</div>
					</a>
				</div>

			</div>
		</section>
			<Footer />
		</div>
	);
};

export default NewsList;
