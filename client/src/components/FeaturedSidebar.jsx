import Featured from './Featured';
import Sidebar from './Sidebar';

const FeaturedSidebar = () => {
	return (
		<section className="featured-articles section section-header-offset">
			<div className="featured-articles-container container d-grid">
				<Featured />
				<Sidebar />
			</div>
		</section>
	);
};

export default FeaturedSidebar;
