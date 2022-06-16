import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {baseImageUrl, publicRequest} from '../requestMethods';
import {useDispatch, useSelector} from 'react-redux';
import {getCategories} from '../redux/apiCalls';

const Categories = () => {
	const dispatch = useDispatch();
	const cats = useSelector((state) => state.category.categories); //fetch post data
	const [loading, setLoading] = useState(true);
	document.querySelector('.sk-cube-grid').style.display = 'block';

	useEffect(() => {
		document.title = 'Categories';
		if (loading) {
			setTimeout(() => {
				setLoading(false);
				document.querySelector('.sk-cube-grid').style.display = 'none';
			}, 500);
		}
		getCategories(dispatch);
	}, [dispatch, loading]);

	// render null when app is not ready
	if (loading) {
		return null;
	}
	return (
		<div>
			<Header />
			<section className="popular-tags section section-header-offset">
				<div className="container padding-bottom">
					<div className="popular-tags-container d-grid">
						{cats.map((c) => (
							<Link
								to={c.CategoryId}
								className="article"
								state={{categoryName: c.CategoryName}}
								key={c.CategoryId}
							>
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
