import React, {Fragment, useState, useEffect} from 'react';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import FormInput from '../components/FormInput';
import {useDispatch, useSelector} from 'react-redux';
import {updateProfile} from '../redux/apiCalls';
import {baseImageUrl} from '../requestMethods';
import {getReadingList, deleteReadingPost} from '../redux/apiCalls';
import {useNavigate} from 'react-router-dom';

const ReadingList = () => {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.user.currentUser);
	const readingList = useSelector((state) => state.reading.readingList);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	document.querySelector('.sk-cube-grid').style.display = 'block';
	useEffect(() => {
		getReadingList(dispatch);
		if (loading) {
			setTimeout(() => {
				setLoading(false);
				document.querySelector('.sk-cube-grid').style.display = 'none';
			}, 400);
		}
		if (!currentUser) {
			return navigate('/');
		}
	}, [loading, dispatch, currentUser, navigate]);

	if (loading) {
		return null; // render null when app is not ready
	}

	const handleDelete = (savePostID, postTitle) => {
		const confirm = window.confirm(`Are you sure, you want to remove '${postTitle}'`);
		if (confirm) {
			deleteReadingPost(savePostID, dispatch);
		}
	};

	return (
		<>
			<Header />
			<section className="blog-post section-header-offset crayons-layout__content crayons-card pb-4">
				<div className="container">
					<h1 className="center-content flex rd-list">Readling List</h1>
					{readingList.map((r) => (
						<article
							className="flex p-4 m:p-6 pb-0 m:pb-2 pr-2 m:pr-6 center-content"
							key={r.SavePostID}
						>
							<a className="crayons-avatar crayons-avatar--l" href="/suri66" datatestid="item-user">
								<img
									src={baseImageUrl + r.Thumbnail}
									alt="Surjeet Bhadauriya"
									className="crayons-avatar__image"
								/>
							</a>
							<div className="flex-1 pl-2 m:pl-4 post-detail">
								<a
									href="/suri66/one-liner-remove-html-tags-from-a-string-55e2"
									className="flex crayons-link"
								>
									<h2 className="fs-base lh-tight m:fs-l fw-bold break-word reading-post-title">
										{r.PostTitle}
									</h2>
								</a>
								<p className="fs-s post-info">
									<a href="/suri66" className="crayons-link fw-medium author-name">
										{r.AuthorInfo.FullName}
									</a>
									<span className="color-base-30"> • </span>
									<span className="color-base-60">
										{r.PublishedDate}
										<span className="color-base-30"> • </span>
										{r.ReadingTime} min read
									</span>
								</p>
							</div>
							<div className="m:self-center">
								<button
									onClick={() => handleDelete(r.SavePostID, r.PostTitle)}
									type="button"
									className="c-btn spec__archive-button"
								>
									<i className="ri-delete-bin-6-line"></i>
								</button>
							</div>
						</article>
					))}

					<div className="flex center-content load-more">
						<button type="submit" className="c-btn w-max">
							Load more
						</button>
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
};

export default ReadingList;
