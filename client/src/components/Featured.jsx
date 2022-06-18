import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {baseImageUrl, publicRequest} from '../requestMethods';
const Featured = () => {
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		const fetchPosts = async () => {
			await publicRequest.get('/post').then((res) => {
				setPosts(
					res.data
						.sort((a, b) => new Date(b.PublishedDate) - new Date(a.PublishedDate))
						.slice(0, 3),
				);
			});
		};
		fetchPosts();
	}, []);
	return (
		<div className="featured-content d-grid">
			<div className="headline-banner">
				<h3 className="headline fancy-border">
					<span className="place-items-center">Breaking news</span>
				</h3>
				<span className="headline-description">Apple announces a new partnership...</span>
			</div>
			{posts.map((p, id) => (
				<Link
					to={`post/${p.PostID}`}
					key={p.PostID}
					className={`article featured-article featured-article-${id + 1}`}
				>
					<img src={baseImageUrl + p.Thumbnail} alt="" className="article-image" />
					<span className="article-category">{p.Categories[0].CategoryName}</span>
					<div className="article-data-container">
						<div className="article-data">
							<span>{p.PublishedDate}</span>
							<span className="article-data-spacer"></span>
							<span>{p.ReadingTime} Min read</span>
						</div>

						<h3 className="title article-title">{p.PostTitle}</h3>
					</div>
				</Link>
			))}
		</div>
	);
};

export default Featured;
