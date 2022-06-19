import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import {useCallback, useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {baseImageUrl, publicRequest} from '../requestMethods';
import ReactPaginate from 'react-paginate';

const Tags = () => {
	const [loadingAnimation, setLoadingAnimation] = useState(true);
	const [loading, setLoading] = useState(true);
	const [hasMore, setHasMore] = useState(false);
	const [page, setPage] = useState(1);
	const observer = useRef();
	const [data, setData] = useState([]);

	document.querySelector('.sk-cube-grid').style.display = 'block';
	useEffect(() => {
		document.title = 'Categories';
		setLoading(true);
		const getCategories = async () => {
			await publicRequest.get('/tag').then((res) => {
				const limit = 6;
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
						{data.map((tag, index) => {
							if (data.length === index + 1) {
								return (
									<Link
										to={tag.TagId}
										className="article"
										state={{tagName: tag.TagName}}
										key={tag.TagId}
										ref={lastCategoryElementRef}
									>
										<span className="tag-name">{tag.TagName}</span>
										<img
											src={baseImageUrl + tag.Thumbnail}
											alt={tag.TagName}
											className="article-image"
										/>
									</Link>
								);
							} else {
								return (
									<Link
										to={tag.TagId}
										className="article"
										state={{tagName: tag.TagName}}
										key={tag.TagId}
									>
										<span className="tag-name">{tag.TagName}</span>
										<img
											src={baseImageUrl + tag.Thumbnail}
											alt={tag.TagName}
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

export default Tags;
