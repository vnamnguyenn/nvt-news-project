import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {publicRequest} from '../requestMethods';
import {useLocation} from 'react-router';

const SearchPost = () => {
	const [posts, setPosts] = useState([]);
	const location = useLocation();
	const title = location.pathname;
	console.log(title);
	// if you want to show the loader when React loads data again
	useEffect(() => {
		const fetchPosts = async () => {
			const res = await publicRequest.get(title);
			setPosts(res.data);
		};
		fetchPosts();
	}, []);
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
	if (loading) {
		return null; // render null when app is not ready
	}
	return (
		<div>
			<Header />
			<section className="older-posts section section-header-offset">
				<div className="container">
					<div className="older-posts-grid-wrapper d-grid">
						{posts.map((p) => (
							<Link to={`/post/${p.PostID}`} key={p.PostID} className="article d-grid">
								<div className="older-posts-article-image-wrapper">
									<img src={p.Thumbnail} alt="" className="article-image" />
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
