import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import '../../assets/sass/general/list.scss';
import Datatable from '../../components/datatable/Datatable';

function Post() {
	return (
		<div className="list">
			<Sidebar />
			<div className="list__container">
				<Navbar />
				<Datatable />
			</div>
		</div>
	);
}

export default Post;
