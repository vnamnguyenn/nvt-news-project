import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import axios from 'axios';
import {useContext, useEffect, useState} from 'react';
import {useLocation} from 'react-router';
import {Link} from 'react-router-dom';
// import { Context } from "../../context/Context";
import DOMPurify from 'dompurify';

const Post = () => {
	const location = useLocation();
	const path = location.pathname.split('/')[2];
	const [post, setPost] = useState({});
	const PF = 'http://localhost:9000/images/';
	// const {user} = useContext(Context);
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');
	const [updateMode, setUpdateMode] = useState(false);

	useEffect(() => {
		const getPost = async () => {
			const res = await axios.get('/post/' + path);
			//   console.log(res.data);
			setPost(res.data);
			setTitle(res.data.PostTitle);
			setDesc(res.data.Content);
		};
		getPost();
	}, [path]);

	const cleanHTML = DOMPurify.sanitize(post.Content, {
		USE_PROFILES: {html: true},
	});
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
								<img src="{au.Avatar}" alt="" className="article-image" />
							</div>
							<div className="author-about">
								<h3 className="author-name">John Doe</h3>
								<p>
									Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque quis repellat
									rerum, possimus cumque dolor repellendus eligendi atque explicabo exercitationem
									id.
								</p>
								<ul className="list social-media">
									<li className="list-item">
										<a href="/#" className="list-link">
											<i className="ri-instagram-line"></i>
										</a>
									</li>
									<li className="list-item">
										<a href="/#" className="list-link">
											<i className="ri-facebook-circle-line"></i>
										</a>
									</li>
									<li className="list-item">
										<a href="/#" className="list-link">
											<i className="ri-twitter-line"></i>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
};

export default Post;
