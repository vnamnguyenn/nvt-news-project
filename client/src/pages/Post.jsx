import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { Fragment } from 'react';

const Post = () => {
	return (
		<Fragment>
            <Header/>
			<section className="blog-post section-header-offset">
				<div className="blog-post-container container">
					<div className="blog-post-data">
						<h3 className="title blog-post-title">Is VR the future?</h3>
						<div className="article-data">
							<span>Dec 6th 2021</span>
							<span className="article-data-spacer"></span>
							<span>4 Min read</span>
						</div>
						<img src="https://res.cloudinary.com/van-nam/image/upload/v1648531528/images/featured/featured-1_khyxmd.jpg" alt="" />
					</div>

					<div className="container">
						<p>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis eius possimus hic
							eligendi distinctio rerum incidunt, esse quasi eum molestiae ducimus ipsam quae,
							aliquid ullam placeat dolorum nulla vero. Quam? Lorem ipsum dolor sit, amet
							consectetur adipisicing elit. Sapiente repellat consequatur culpa, repudiandae aut
							dolores iusto. Rem natus soluta, dolores, ad deleniti, aut dolorem corrupti quasi amet
							unde delectus hic?
						</p>

						<p>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis eius possimus hic
							eligendi distinctio rerum incidunt, esse quasi eum molestiae ducimus ipsam quae,
							aliquid ullam placeat dolorum nulla vero. Quam? Lorem ipsum dolor sit amet
							consectetur, adipisicing elit. Vero quod necessitatibus, aspernatur pariatur
							asperiores earum quas adipisci veritatis quidem facilis! Nihil veniam quaerat nulla
							possimus, asperiores vero voluptatum placeat. Eveniet!
						</p>

						<blockquote className="quote">
							<p>
								<span>
									<i className="ri-double-quotes-l"></i>
								</span>{' '}
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia voluptates,
								laboriosam voluptatum quos non consequuntur nesciunt necessitatibus tempora quod
								inventore corporis rem nihil itaque, at provident minus aliquam veritatis. Labore?{' '}
								<span>
									<i className="ri-double-quotes-r"></i>
								</span>
							</p>
						</blockquote>

						<p>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis eius possimus hic
							eligendi distinctio rerum incidunt, esse quasi eum molestiae ducimus ipsam quae,
							aliquid ullam placeat dolorum nulla vero. Quam? Lorem ipsum dolor sit amet
							consectetur, adipisicing elit. Vero quod necessitatibus, aspernatur pariatur
							asperiores earum quas adipisci veritatis quidem facilis! Nihil veniam quaerat nulla
							possimus, asperiores vero voluptatum placeat. Eveniet!
						</p>

						<div className="author d-grid">
							<div className="author-image-box">
								<img src="https://res.cloudinary.com/van-nam/image/upload/v1648531530/images/author_lpc3l5.jpg" alt="" className="article-image" />
							</div>
							<div className="author-about">
								<h3 className="author-name">John Doe</h3>
								<p>
									Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque quis repellat
									rerum, possimus cumque dolor repellendus eligendi atque explicabo exercitationem
									id.
								</p>
								<ul className="list social-media">
									<li className="list-item">
										<a href="/#" className="list-link">
											<i className="ri-instagram-line"></i>
										</a>
									</li>
									<li className="list-item">
										<a href="/#" className="list-link">
											<i className="ri-facebook-circle-line"></i>
										</a>
									</li>
									<li className="list-item">
										<a href="/#" className="list-link">
											<i className="ri-twitter-line"></i>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</section>
            <Footer/>
		</Fragment>
	);
};

export default Post;
