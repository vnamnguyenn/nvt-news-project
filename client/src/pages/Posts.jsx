import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {publicRequest} from '../requestMethods';
// import {Link} from 'react-router-dom';

const Posts = () => {
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		const fetchPosts = async () => {
			const res = await publicRequest.get('/post');
			setPosts(res.data);
		};
		fetchPosts();
	}, []);
	return (
		<div>
			<Header />
			<section className="older-posts section section-header-offset">
				<div className="container">
					<div className="older-posts-grid-wrapper d-grid">
						{posts.map((p) => (
							<Link to={p.PostID} key={p.PostID} className="article d-grid">
								<div className="older-posts-article-image-wrapper">
									<img src={p.Thumbnail} alt="" className="article-image" />
								</div>
								<div className="article-data-container">
									<div className="article-data">
										<span>{p.PublishedDate}</span>
										<span className="article-data-spacer"></span>
										<span>{p.ReadingTime} Min read</span>
									</div>
									<h3 className="title article-title">{p.PostTitle}</h3>
									<p className="article-description">{p.Description}</p>
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default Posts;
