import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {baseImageUrl, publicRequest} from '../requestMethods';
import ReactPaginate from 'react-paginate';

function Posts() {
	const [posts, setPosts] = useState([]);
	const [totalPage, setTotalPage] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	document.querySelector('.sk-cube-grid').style.display = 'block';
	const [loading, setLoading] = useState(true);
	// fetch data from server
	useEffect(() => {
		document.title = 'News | NVT';
		if (loading) {
			setTimeout(() => {
				setLoading(false);
				document.querySelector('.sk-cube-grid').style.display = 'none';
			}, 500);
		}
		const fetchPosts = async () => {
			await publicRequest.get('/post').then((res) => {
				const limit = 10;
				const startIndex = (currentPage - 1) * limit;
				const endIndex = currentPage * limit;
				setTotalPage(Math.ceil(res.data.length / limit));
				setPosts(res.data.slice(startIndex, endIndex));
			});
		};
		fetchPosts();
	}, [currentPage, loading]);

	function handlePageChange(newPage) {
		setCurrentPage(newPage.selected + 1);
	}

	// render null when app is not ready
	if (loading) {
		return null;
	}

	return (
		<div>
			<Header />
			<section className="older-posts section section-header-offset">
				<div className="container padding-bottom">
					<div className="older-posts-grid-wrapper d-grid">
						{posts.map((p) => (
							<Link to={p.PostID} key={p.PostID} className="article d-grid">
								<div className="older-posts-article-image-wrapper">
									<img src={baseImageUrl + p.Thumbnail} alt="" className="article-image" />
								</div>
								<div className="article-data-container">
									<div className="article-data">
										<span>{p.PublishedDate}</span>
										<span className="article-data-spacer"></span>
										<span>{p.ReadingTime} Min read</span>
									</div>
									<h3 className="title article-title">{p.PostTitle}</h3>
									<p className="article-description">{p.Description}</p>
								</div>
							</Link>
						))}
					</div>
					<ReactPaginate
						previousLabel={'<'}
						nextLabel={'>'}
						breakLabel={'...'}
						pageCount={totalPage}
						marginPagesDisplayed={2}
						pageRangeDisplayed={5}
						onPageChange={handlePageChange}
						containerClassName={'pagination justify-content-center'}
						pageClassName={'page-item'}
						pageLinkClassName={'page-link'}
						previousClassName={'page-item'}
						previousLinkClassName={'page-link'}
						nextClassName={'page-item'}
						nextLinkClassName={'page-link'}
						breakClassName={'page-item'}
						breakLinkClassName={'page-link'}
						activeClassName={'active'}
					/>
				</div>
			</section>
			<Footer />
		</div>
	);
}

export default Posts;
