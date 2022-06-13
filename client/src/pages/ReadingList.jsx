import React, {Fragment, useState, useEffect} from 'react';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import FormInput from '../components/FormInput';
import {useDispatch, useSelector} from 'react-redux';
import {updateProfile} from '../redux/apiCalls';
import {baseImageUrl, publicRequest} from '../requestMethods';
const ReadingList = () => {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.user.currentUser);

	const handleSubmit = async (e) => {
		e.preventDefault();
	};

	return (
		<>
			<Header />

			<section class="blog-post section-header-offset crayons-layout__content crayons-card pb-4">
				<div className="container">
					<h1 className="center-content flex rd-list">Readling List</h1>
					<article class="flex p-4 m:p-6 pb-0 m:pb-2 pr-2 m:pr-6 center-content">
						<a class="crayons-avatar crayons-avatar--l" href="/suri66" datatestid="item-user">
							<img
								src="https://res.cloudinary.com/practicaldev/image/fetch/s--MJ-KYoju--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/875158/f18245e9-ad99-469e-a816-81280ded450e.jpeg"
								alt="Surjeet Bhadauriya"
								class="crayons-avatar__image"
							/>
						</a>
						<div class="flex-1 pl-2 m:pl-4 post-detail">
							<a
								href="/suri66/one-liner-remove-html-tags-from-a-string-55e2"
								class="flex crayons-link"
							>
								<h2 class="fs-base lh-tight m:fs-l fw-bold break-word reading-post-title">
									One liner - remove html tags from a string
								</h2>
							</a>
							<p class="fs-s post-info">
								<a href="/suri66" class="crayons-link fw-medium author-name">
									Surjeet Bhadauriya
								</a>
								<span class="color-base-30"> • </span>
								<span class="color-base-60">
									Jun 10 2022<span class="color-base-30"> • </span>1 min read
								</span>
							</p>
						</div>
						<div class="m:self-center">
							<button type="button" class="c-btn spec__archive-button">
								<i class="ri-delete-bin-6-line"></i>
							</button>
						</div>
					</article>
					<article class="flex p-4 m:p-6 pb-0 m:pb-2 pr-2 m:pr-6 center-content">
						<a class="crayons-avatar crayons-avatar--l" href="/suri66" datatestid="item-user">
							<img
								src="https://res.cloudinary.com/practicaldev/image/fetch/s--MJ-KYoju--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/875158/f18245e9-ad99-469e-a816-81280ded450e.jpeg"
								alt="Surjeet Bhadauriya"
								class="crayons-avatar__image"
							/>
						</a>
						<div class="flex-1 pl-2 m:pl-4 post-detail">
							<a
								href="/suri66/one-liner-remove-html-tags-from-a-string-55e2"
								class="flex crayons-link"
							>
								<h2 class="fs-base lh-tight m:fs-l fw-bold break-word reading-post-title">
									One liner - remove html tags from a string22 22222222 21231 23123123 13123 1222123
									1236127 3612736712 6371263 712637
								</h2>
							</a>
							<p class="fs-s post-info">
								<a href="/suri66" class="crayons-link fw-medium author-name">
									Surjeet Bhadauriya
								</a>
								<span class="color-base-30"> • </span>
								<span class="color-base-60">
									Jun 10 2022<span class="color-base-30"> • </span>1 min read
								</span>
							</p>
						</div>
						<div class="m:self-center">
							<button type="button" class="c-btn spec__archive-button">
								<i class="ri-delete-bin-6-line"></i>
							</button>
						</div>
					</article>
					<div class="flex center-content load-more">
						<button type="submit" class="c-btn w-max">
							Load more
						</button>
					</div>
				</div>
			</section>
		</>
	);
};

export default ReadingList;
