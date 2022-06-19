import {Link} from 'react-router-dom';
import {baseImageUrl} from '../requestMethods';

const OlderPost = ({data}) => {
	const posts = data
		// .sort((a, b) => new Date(a.PublishedDate) - new Date(b.PublishedDate))
		.slice(0, 4);

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
								<img src={baseImageUrl + p.Thumbnail} alt="" className="article-image" />
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
