import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import {useCallback, useEffect, useRef, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {baseImageUrl, publicRequest} from '../requestMethods';

function PostsAuthor() {
	// const [posts, setPosts] = useState([]);
	const location = useLocation();
	const AuthorID = location.pathname.split('/')[2];
	const AuthorName = location.state.authorName;
	const [loadingAnimation, setLoadingAnimation] = useState(true);
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [hasMore, setHasMore] = useState(false);
	const observer = useRef();
	const [page, setPage] = useState(1);
	document.querySelector('.sk-cube-grid').style.display = 'block';
	// fetch data from server
	useEffect(() => {
		document.title = 'List post by ' + AuthorName;
		setLoading(true);
		const fetchPosts = async () => {
			await publicRequest.get('/post/get_by_author/' + AuthorID).then((res) => {
				const limit = 6;
				const startIndex = (page - 1) * limit;
				const endIndex = page * limit;
				setPosts((prevData) => {
					return [...new Set([...prevData, ...res.data.slice(startIndex, endIndex)])];
				});
				setHasMore(res.data.length > 0);
				setLoading(false);
			});
		};
		fetchPosts();
	}, [AuthorID, AuthorName, page]);

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
			<section className="older-posts section section-header-offset">
				<div className="container padding-bottom">
					<div style={{display: 'flex', justifyContent: 'center', paddingBottom: '30px'}}>
						<h2>Author: {AuthorName}</h2>
					</div>
					<div className="older-posts-grid-wrapper d-grid">
						{posts.map((p, index) => {
							if (posts.length === index + 1) {
								return (
									<Link
										to={`/post/${p.PostID}`}
										key={p.PostID}
										ref={lastCategoryElementRef}
										className="article d-grid"
									>
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
								);
							} else {
								return (
									<Link to={`/post/${p.PostID}`} key={p.PostID} className="article d-grid">
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
}

export default PostsAuthor;
