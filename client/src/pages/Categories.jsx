import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import {useCallback, useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {baseImageUrl, publicRequest} from '../requestMethods';

const Categories = (pageNumber) => {
	const [loadingAnimation, setLoadingAnimation] = useState(true);
	const [loading, setLoading] = useState(true);
	const [hasMore, setHasMore] = useState(false);
	const [data, setData] = useState([]);
	const [page, setPage] = useState(1);
	document.querySelector('.sk-cube-grid').style.display = 'block';
	useEffect(() => {
		document.title = 'Categories';
		setLoading(true);
		const getCategories = async () => {
			await publicRequest.get('/category').then((res) => {
				const limit = 9;
				const startIndex = (page - 1) * limit;
				const endIndex = page * limit;
				setData((prevData) => {
					return [...new Set([...prevData, ...res.data.slice(startIndex, endIndex)])];
				});
				setHasMore(res.data.length > 0);
				setLoading(false);
			});
		};
		getCategories();
	}, [page]);

	useEffect(() => {
		if (loadingAnimation) {
			setTimeout(() => {
				setLoadingAnimation(false);
				document.querySelector('.sk-cube-grid').style.display = 'none';
			}, 500);
		}
	}, [loadingAnimation]);

	const observer = useRef();
	const lastCategoryElementRef = useCallback(
		(node) => {
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					setPage((currentPage) => currentPage + 1);
				}
			});
			if (node) observer.current.observe(node);
		},
		[hasMore],
	);

	if (loadingAnimation) {
		return null;
	}

	return (
		<div>
			<Header />
			<section className="popular-tags section section-header-offset">
				<div className="container padding-bottom">
					<div className="popular-tags-container d-grid">
						{data.map((cat, index) => {
							if (data.length === index + 1) {
								return (
									<Link
										ref={lastCategoryElementRef}
										to={cat.CategoryId}
										className="article"
										state={{categoryName: cat.CategoryName}}
										key={cat.CategoryId}
									>
										<span className="tag-name">{cat.CategoryName}</span>
										<img
											src={baseImageUrl + cat.Thumbnail}
											alt={cat.CategoryName}
											className="article-image"
										/>
									</Link>
								);
							} else {
								return (
									<Link
										to={cat.CategoryId}
										className="article"
										state={{categoryName: cat.CategoryName}}
										key={cat.CategoryId}
									>
										<span className="tag-name">{cat.CategoryName}</span>
										<img
											src={baseImageUrl + cat.Thumbnail}
											alt={cat.CategoryName}
											className="article-image"
										/>
									</Link>
								);
							}
						})}
					</div>
					<div style={{textAlign: 'center', marginTop: '50px'}}>{loading && 'Loading...'}</div>
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default Categories;
