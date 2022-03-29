import {Fragment} from 'react';
import FeaturedSidebar from '../components/FeaturedSidebar';
import Header from '../layouts/Header';
import Seach from '../components/Seach';
import Quickread from '../components/QuickRead';
import OlderPost from '../components/OlderPost';
import PopularTags from '../components/PopularTags';
import NewsLetter from '../components/NewsLetter';
import Footer from '../layouts/Footer';
function Home() {
	return (
		<Fragment>
			<Header />
			<FeaturedSidebar />
			<Quickread/>
			<OlderPost/>
			<PopularTags/>
			<NewsLetter/>
			<Footer/>
		</Fragment>
	);
}

export default Home;
