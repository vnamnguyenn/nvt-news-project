import {Fragment} from 'react';
import FeaturedSidebar from '../components/FeaturedSidebar';
import Navbar from '../layouts/Navbar';
import Seach from '../components/Seach';
function Home() {
	return (
		<Fragment>
			<Navbar />
			<Seach />
			<FeaturedSidebar />
		</Fragment>
	);
}

export default Home;
