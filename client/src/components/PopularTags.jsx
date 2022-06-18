import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {baseImageUrl, publicRequest} from '../requestMethods';
const PopularTags = () => {
	const [tags, setTags] = useState([]);
	useEffect(() => {
		const fetchTags = async () => {
			await publicRequest.get('/tag').then((res) => {
				setTags(
					res.data.slice(0, 6).sort((a, b) => new Date(b.CreatedDate) - new Date(a.CreatedDate)),
				);
			});
		};
		fetchTags();
	}, []);
	return (
		<section className="popular-tags section">
			<div className="container">
				<h2 className="title section-title" data-name="Popular tags">
					Popular tags
				</h2>
				<div className="popular-tags-container d-grid">
					{tags.map((t, id) => (
						<Link to="" key={t.TagId} className="article">
							<span className="tag-name">#{t.TagName}</span>
							<img src={baseImageUrl + t.Thumbnail} alt="" className="article-image" />
						</Link>
					))}
				</div>
			</div>
		</section>
	);
};

export default PopularTags;
