import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import {useEffect, useState} from 'react';
import {useLocation} from 'react-router';
import {baseImageUrl, publicRequest} from '../requestMethods';
import DOMPurify from 'dompurify';
import Comments from '../components/Comments';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {addReadingPost} from '../redux/apiCalls';
import {toast} from 'react-toastify';
const Post = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const currentUser = useSelector((state) => state.user.currentUser);
	const [post, setPost] = useState({});
	const [loading, setLoading] = useState(true);
	const postID = location.pathname.split('/')[2];

	useEffect(() => {
		if (loading) {
			setTimeout(() => {
				setLoading(false);
				document.querySelector('.sk-cube-grid').style.display = 'none';
			}, 500);
		}
		const getPost = async () => {
			const res = await publicRequest.get('/post/' + postID);
			document.title = res.data.PostTitle;
			setPost(res.data);
		};
		getPost();
	}, [postID, loading]);

	const cleanHTML = DOMPurify.sanitize(post.Content, {
		USE_PROFILES: {html: true},
	});
	document.querySelector('.sk-cube-grid').style.display = 'block';

	if (loading) {
		return null; // render null when app is not ready
	}

	const handleClickSave = () => {
		if (!currentUser) {
			toast.error('Login is required', {
				position: 'bottom-right',
				autoClose: 2500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
		} else {
			addReadingPost(
				{
					PostID: postID,
					PostTitle: post.PostTitle,
					Thumbnail: post.Thumbnail,
					ReadingTime: post.ReadingTime,
					AuthorInfo: post.AuthorInfo,
					CreatedDate: post.CreatedDate,
					PublishedDate: post.PublishedDate,
				},
				dispatch,
			);
		}
	};

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
						<img src={baseImageUrl + post.PostImage} alt="" />
					</div>
					<div className="container">
						<div className="post-content" dangerouslySetInnerHTML={{__html: cleanHTML}} />
						<div className="crayons-reaction">
							<button
								id="reaction-butt-like"
								aria-label="Like"
								aria-pressed="false"
								className="crayons-reaction crayons-reaction--like activated"
								data-category="like"
								title="Heart"
							>
								<span className="crayons-reaction__icon crayons-reaction__icon--inactive">
									<i className="ri-heart-2-line crayons-reaction__icon--inactive" />
									{/* <i className="ri-heart-2-fill crayons-reaction__icon--active" /> */}
									<span className="crayons-reaction__count" id="reaction-number-like">
										4
									</span>
								</span>
							</button>
							<button
								id="reaction-butt-readinglist"
								aria-label="Add to reading list"
								aria-pressed="true"
								className="crayons-reaction crayons-reaction--readinglist activated user-activated not-user-animated"
								data-category="readinglist"
								title="Save"
							>
								<span className="crayons-reaction__icon ">
									<i className="ri-chat-2-line crayons-reaction__icon--inactive" />
									{/* <i className="ri-chat-2-fill crayons-reaction__icon--active" /> */}
									<span className="crayons-reaction__count" id="reaction-number-readinglist">
										4
									</span>
								</span>
							</button>
							<button
								id="reaction-butt-readinglist"
								aria-label="Add to reading list"
								aria-pressed="true"
								className="crayons-reaction crayons-reaction--readinglist activated user-activated not-user-animated"
								data-category="readinglist"
								title="Save"
								onClick={handleClickSave}
							>
								<span className="crayons-reaction__icon ">
									<i className="ri-bookmark-line crayons-reaction__icon--inactive" />
									{/* <i className="ri-bookmark-fill crayons-reaction__icon--active" /> */}
									<span className="crayons-reaction__count" id="reaction-number-readinglist">
										6
									</span>
								</span>
							</button>
						</div>
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
								{post.Tags.map((tag) => (
									<li className="menu__item" key={tag.TagId}>
										<Link to={`/tag/${tag.TagId}`}>{tag.TagName}</Link>
									</li>
								))}
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
