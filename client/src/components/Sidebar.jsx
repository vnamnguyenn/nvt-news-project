import {baseImageUrl, publicRequest} from '../requestMethods';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
const Sidebar = () => {
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		const fetchPosts = async () => {
			const res = await publicRequest.get('/post/trending_news');
			setPosts(res.data);
		};
		fetchPosts();
	}, []);
	return (
		<div className="sidebar d-grid">
			<h3 className="title featured-content-title">Trending news</h3>
			{posts.map((p, id) => (
				<Link to={`post/${p.PostID}`} key={p.PostID} className="trending-news-box">
					<div className="trending-news-img-box">
						<span className="trending-number place-items-center">0{id + 1}</span>
						<img src={baseImageUrl + p.Thumbnail} alt="" className="article-image" />
					</div>
					<div className="trending-news-data">
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

export default Sidebar;
