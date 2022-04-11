import FeaturedSidebar from '../components/FeaturedSidebar';
import Quickread from '../components/QuickRead';
import OlderPost from '../components/OlderPost';
import PopularTags from '../components/PopularTags';
import NewsLetter from '../components/NewsLetter';
import Footer from '../layouts/Footer';
import Header from '../layouts/Header';
import {useEffect, useState} from 'react';

function Home() {
	return (
		<>
			<div className="home">
				<Header />
				<FeaturedSidebar />
				<Quickread />
				<OlderPost />
				<PopularTags />
				<NewsLetter />
				<Footer />
			</div>
		</>
	);
}

export default Home;
