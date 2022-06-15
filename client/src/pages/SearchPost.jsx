import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {baseImageUrl, publicRequest} from '../requestMethods';
import {useLocation} from 'react-router';

const SearchPost = () => {
	const [posts, setPosts] = useState([]);
	const location = useLocation();
	const queryString = location.search;
	const title = location.state.searchParam;
	const [loading, setLoading] = useState(true);
	document.querySelector('.sk-cube-grid').style.display = 'block';
	console.log('search result', title);
	useEffect(() => {
		document.title = 'Results for: ' + title;
		if (loading) {
			setTimeout(() => {
				setLoading(false);
				document.querySelector('.sk-cube-grid').style.display = 'none';
			}, 500);
		}
		const fetchPosts = async () => {
			const res = await publicRequest.get('/search' + queryString);
			setPosts(res.data);
		};
		fetchPosts();
	}, [queryString, loading]);

	if (loading) {
		return null; // render null when app is not ready
	}

	return (
		<div>
			<Header />
			<section className="older-posts section section-header-offset">
				<div className="container">
					<h1 className="center-content flex rd-list" style={{paddingBottom: '5rem'}}>
						results for: {title}
					</h1>
					<div className="older-posts-grid-wrapper d-grid">
						{posts.map((p) => (
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
						))}
					</div>
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default SearchPost;
