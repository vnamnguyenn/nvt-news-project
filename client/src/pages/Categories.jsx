import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {baseImageUrl, publicRequest} from '../requestMethods';

const Categories = () => {
	const [cats, setCats] = useState([]);

	useEffect(() => {
		const getCats = async () => {
			const res = await publicRequest.get('/category');
			setCats(res.data);
		};
		document.title = 'Categories | NVT';
		getCats();
	}, []);

	//loader animation
	document.querySelector('.sk-cube-grid').style.display = 'block';
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		if (loading) {
			setTimeout(() => {
				setLoading(false);
				document.querySelector('.sk-cube-grid').style.display = 'none';
			}, 500);
		}
	}, [loading]);
	// render null when app is not ready
	if (loading) {
		return null;
	}
	return (
		<div>
			<Header />
			<section className="popular-tags section section-header-offset">
				<div className="container">
					<div className="popular-tags-container d-grid">
						{cats.map((c) => (
							<Link to={c.CategoryId} className="article" key={c.CategoryId}>
								<span className="tag-name">{c.CategoryName}</span>
								<img
									src={baseImageUrl + c.Thumbnail}
									alt={c.CategoryName}
									className="article-image"
								/>
							</Link>
						))}
					</div>
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default Categories;
