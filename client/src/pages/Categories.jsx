import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

const Categories = () => {
	const [cats, setCats] = useState([]);

	useEffect(() => {
		const getCats = async () => {
			const res = await axios.get('/category');
			setCats(res.data);
		};
		getCats();
	}, []);
	return (
		<div>
			<Header />
			<section className="popular-tags section section-header-offset">
				<div className="container">
					<div className="popular-tags-container d-grid">
						{cats.map((c) => (
							<Link to={c.CategoryId} className="article" key={c.CategoryId}>
								<span className="tag-name">{c.CategoryName}</span>
								<img src={c.Thumbnail} alt={c.CategoryName} className="article-image" />
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
