import Featured from './Featured';
import Sidebar from './Sidebar';

const FeaturedSidebar = ({data}) => {
	return (
		<section className="featured-articles section section-header-offset">
			<div className="featured-articles-container container d-grid">
				<Featured data={data} />
				<Sidebar data={data} />
			</div>
		</section>
	);
};

export default FeaturedSidebar;
