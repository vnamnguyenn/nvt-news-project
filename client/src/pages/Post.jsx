import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import {useEffect, useState} from 'react';
import {useLocation} from 'react-router';
import {baseImageUrl, publicRequest} from '../requestMethods';
import DOMPurify from 'dompurify';
import Comments from '../components/Comments';

const Post = () => {
	const location = useLocation();
	const [post, setPost] = useState({});
	const postID = location.pathname.split('/')[2];

	useEffect(() => {
		const getPost = async () => {
			const res = await publicRequest.get('/post/' + postID);
			document.title = res.data.PostTitle;
			setPost(res.data);
		};
		getPost();
	}, [postID]);

	const cleanHTML = DOMPurify.sanitize(post.Content, {
		USE_PROFILES: {html: true},
	});

	document.querySelector('.sk-cube-grid').style.display = 'block';
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (loading) {
			setTimeout(() => {
				setLoading(false);
				document.querySelector('.sk-cube-grid').style.display = 'none';
			}, 400);
		}
	}, [loading]);
	if (loading) {
		return null; // render null when app is not ready
	}
	return (
		<>
			<Header />
			<section className="blog-post section-header-offset">
				<div className="blog-post-container container">
					<div className="blog-post-data">
						<h3 className="title blog-post-title">{post.PostTitle}</h3>
						<div className="article-data">
							<span>{post.PublishedDate}</span>
							<span className="article-data-spacer"></span>
							<span>{post.ReadingTime} Min read</span>
						</div>
						<img src={post.PostImage} alt="" />
					</div>
					<div className="container">
						<div className="post-content" dangerouslySetInnerHTML={{__html: cleanHTML}} />
						<div className="author d-grid">
							<div className="author-image-box">
								<img
									src={`${baseImageUrl}${post.AuthorInfo?.Avatar}`}
									alt=""
									className="article-image"
								/>
							</div>
							<div className="author-about">
								<h3 className="author-name">{post.AuthorInfo?.FullName}</h3>
								<p>{post.AuthorInfo?.Description}</p>
								<ul className="list social-media">
									<li className="list-item">
										<a href="/" className="list-link">
											<i className="ri-instagram-line"></i>
										</a>
									</li>
									<li className="list-item">
										<a href="/" className="list-link">
											<i className="ri-facebook-circle-line"></i>
										</a>
									</li>
									<li className="list-item">
										<a href="/" className="list-link">
											<i className="ri-twitter-line"></i>
										</a>
									</li>
								</ul>
							</div>
						</div>
						<div className="article__tags">
							<h2>Tags</h2>
							<ul className="menu article__tags__menu">
								<li className="menu__item">
									<a href="/column/">Column</a>
								</li>
								<li className="menu__item">
									<a href="/diversity-2/">Diversity</a>
								</li>
								<li className="menu__item">
									<a href="/hiring/">Hiring</a>
								</li>
								<li className="menu__item">
									<a href="/personnel/">Personnel</a>
								</li>
								<li className="menu__item">
									<a href="/startups/">Startups</a>
								</li>
								<li className="menu__item">
									<a href="/talent/">Talent</a>
								</li>
								<li className="menu__item">
									<a href="/tag/bias/">bias</a>
								</li>
								<li className="menu__item">
									<a href="/tag/diverse-hiring/">diverse hiring</a>
								</li>
								<li className="menu__item">
									<a href="/tag/diversity/">diversity</a>
								</li>
								<li className="menu__item">
									<a href="/tag/ec-column/">EC Column</a>
								</li>
								<li className="menu__item">
									<a href="/tag/ec-dei/">EC DEI</a>
								</li>
								<li className="menu__item">
									<a href="/tag/ec-how-to/">EC How To</a>
								</li>
								<li className="menu__item">
									<a href="/tag/executive/">executive</a>
								</li>
								<li className="menu__item">
									<a href="/tag/hiring/">hiring</a>
								</li>
								<li className="menu__item">
									<a href="/tag/inclusion/">inclusion</a>
								</li>
								<li className="menu__item">
									<a href="/tag/interview/">interview</a>
								</li>
								<li className="menu__item">
									<a href="/techcrunchplus/work/">Work</a>
								</li>
							</ul>
						</div>
						<div className="comments-container">
							<Comments postAuthorID={post.AuthorInfo.AccountId} postID={postID} />
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
};

export default Post;
