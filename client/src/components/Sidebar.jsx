import {baseImageUrl} from '../requestMethods';

import {Link} from 'react-router-dom';

const Sidebar = ({data}) => {
	const posts = [...data.slice(data.length - 10, data.length - 6)];
	posts.sort((a, b) => new Date(b.PublishedDate) - new Date(a.PublishedDate)).reverse();

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
