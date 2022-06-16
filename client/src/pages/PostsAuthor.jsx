import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {baseImageUrl, publicRequest} from '../requestMethods';

function PostsAuthor() {
	// const [posts, setPosts] = useState([]);
	const location = useLocation();
	const AuthorID = location.pathname.split('/')[2];
	const AuthorName = location.state.authorName;
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	document.querySelector('.sk-cube-grid').style.display = 'block';

	// fetch data from server
	useEffect(() => {
		if (loading) {
			setTimeout(() => {
				setLoading(false);
				document.querySelector('.sk-cube-grid').style.display = 'none';
			}, 500);
		}
		const fetchPosts = async () => {
			document.title = 'List post by ' + AuthorName;
			const res = await publicRequest.get('/post/get_by_author/' + AuthorID);
			setPosts(res.data);
		};
		fetchPosts();
	}, [AuthorID, loading, AuthorName]);
	console.log(posts);

	// render null when app is not ready
	if (loading) {
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
}

export default PostsAuthor;
