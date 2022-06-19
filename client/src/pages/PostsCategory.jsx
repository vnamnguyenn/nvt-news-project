import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import Footer from '../layouts/Footer';
import Header from '../layouts/Header';
import {baseImageUrl, publicRequest} from '../requestMethods';

const PostsCategory = () => {
	const location = useLocation();
	const categoryName = location.state ? location.state.categoryName : 'Category';
	const categoryID = location.pathname.split('/')[2];
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	document.querySelector('.sk-cube-grid').style.display = 'block';
	let postCategory = [];

	useEffect(() => {
		document.title = categoryName;
		if (loading) {
			setTimeout(() => {
				setLoading(false);
				document.querySelector('.sk-cube-grid').style.display = 'none';
			}, 500);
		}
		const fetchPosts = async () => {
			const res = await publicRequest.get('/post');
			setPosts(res.data);
		};
		fetchPosts();
	}, [loading, categoryName]);

	for (let i = 0; i < posts.length; i++) {
		for (let j = 0; j < posts[i].Categories.length; j++) {
			if (posts[i].Categories[j].CategoryId === categoryID) {
				postCategory.push(posts[i]);
			}
		}
	}

	if (loading) {
		return null;
	}

	return (
		<div>
			<Header />
			<section className="older-posts section section-header-offset">
				<div className="container padding-bottom">
					<div style={{display: 'flex', justifyContent: 'center', paddingBottom: '30px'}}>
						<h2>Category: {categoryName}</h2>
					</div>
					<div className="older-posts-grid-wrapper d-grid">
						{postCategory.map((p) => (
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

export default PostsCategory;
