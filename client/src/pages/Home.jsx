import FeaturedSidebar from '../components/FeaturedSidebar';
import Quickread from '../components/QuickRead';
import OlderPost from '../components/OlderPost';
import PopularTags from '../components/PopularTags';
import NewsLetter from '../components/NewsLetter';
import Footer from '../layouts/Footer';
import Header from '../layouts/Header';
import {useEffect, useState} from 'react';
import {getPosts, getTags} from '../redux/apiCalls';
import {useDispatch, useSelector} from 'react-redux';

function Home() {
	const posts = useSelector((state) => state.post.posts);
	const tags = useSelector((state) => state.tag.tags);
	const dispatch = useDispatch();
	useEffect(() => {
		getPosts(dispatch);
		getTags(dispatch);
	}, [dispatch]);

	return (
		<>
			<div className="home">
				<Header />
				<FeaturedSidebar data={posts} />
				<Quickread data={posts} />
				<OlderPost data={posts} />
				<PopularTags data={tags} />
				<NewsLetter />
				<Footer />
			</div>
		</>
	);
}

export default Home;
