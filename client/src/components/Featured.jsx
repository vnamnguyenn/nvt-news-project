import {Link} from 'react-router-dom';
import {baseImageUrl} from '../requestMethods';
const Featured = ({data}) => {
	const posts = [...data.slice(-4, -1)];
	posts.sort((a, b) => new Date(b.PublishedDate) - new Date(a.PublishedDate));
	return (
		<div className="featured-content d-grid">
			<div className="headline-banner">
				<h3 className="headline fancy-border">
					<span className="place-items-center">Breaking news</span>
				</h3>
				<span className="headline-description">
					<Link to={`/post/${posts[2]?.PostID}`}>{posts[2]?.PostTitle}</Link>{' '}
				</span>
			</div>
			{posts.map((p, id) => (
				<Link
					to={`post/${p?.PostID}`}
					key={p.PostID}
					className={`article featured-article featured-article-${id + 1}`}
				>
					<img src={baseImageUrl + p?.Thumbnail} alt="" className="article-image" />
					<span className="article-category">{p.Tags[0]?.TagName}</span>
					<div className="article-data-container">
						<div className="article-data">
							<span>{p.PublishedDate}</span>
							<span className="article-data-spacer"></span>
							<span>{p.ReadingTime} Min read</span>
						</div>

						<h3 className="title article-title">{p?.PostTitle}</h3>
					</div>
				</Link>
			))}
		</div>
	);
};

export default Featured;
