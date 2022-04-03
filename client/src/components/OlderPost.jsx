import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {publicRequest} from '../requestMethods';

const OlderPost = () => {
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		const fetchPosts = async () => {
			const res = await publicRequest.get('/post/older_post');
			setPosts(res.data);
		};
		fetchPosts();
	}, []);
	return (
		<section className="older-posts section">
			<div className="container">
				<h2 className="title section-title" data-name="Older posts">
					Older posts
				</h2>
				<div className="older-posts-grid-wrapper d-grid">
					{posts.map((p) => (
						<Link to={`post/${p.PostID}`} key={p.PostID} className="article d-grid">
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

				<div className="see-more-container">
					<a href="/#" className="btn see-more-btn place-items-center">
						See more <i className="ri-arrow-right-s-line"></i>
					</a>
				</div>
			</div>
		</section>
	);
};

export default OlderPost;
