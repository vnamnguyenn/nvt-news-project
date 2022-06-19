import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {baseImageUrl, publicRequest} from '../requestMethods';
const PopularTags = ({data}) => {
	const tags = [...data.slice(0, 6)];
	tags.sort((a, b) => new Date(b.CreatedDate) - new Date(a.CreatedDate));

	return (
		<section className="popular-tags section">
			<div className="container">
				<h2 className="title section-title" data-name="Popular tags">
					Popular tags
				</h2>
				<div className="popular-tags-container d-grid">
					{tags.map((tag, id) => (
						<Link
							to={`/tag/${tag.TagId}`}
							state={{tagName: tag.TagName}}
							key={tag.TagId}
							className="article"
						>
							<span className="tag-name">{tag.TagName}</span>
							<img src={baseImageUrl + tag.Thumbnail} alt="" className="article-image" />
						</Link>
					))}
				</div>
			</div>
		</section>
	);
};

export default PopularTags;
