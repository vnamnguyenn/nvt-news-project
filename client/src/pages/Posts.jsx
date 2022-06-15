import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {baseImageUrl} from '../requestMethods';
import ReactPaginate from 'react-paginate';
import QueryString from 'query-string';
import {useDispatch, useSelector} from 'react-redux';
import {getPosts} from '../redux/apiCalls';

function Posts() {
	// const [posts, setPosts] = useState([]);
	const posts = useSelector((state) => state.post.posts); //fetch post data
	const dispatch = useDispatch();
	const pageSize = 10;
	const startIndex = 1;
	//set pagition
	const [pagination, setPagination] = useState({
		currentPage: startIndex,
		limit: pageSize,
		totalPage: 1,
	});
	//get new content when page change
	const [filters, setFilters] = useState({
		page: startIndex,
		limit: pageSize,
	});

	// fetch data from server
	useEffect(() => {
		const fetchPosts = async () => {
			const paramsString = QueryString.stringify(filters);
			document.title = 'News | NVT';
			getPosts(paramsString, dispatch);
			setPagination(posts.pagination);
		};
		fetchPosts();
	}, [dispatch, filters, posts.pagination]);

	function handlePageChange(newPage) {
		//update content when click page change
		setFilters({
			...filters,
			page: newPage.selected + 1, // index page started = 0
		});
	}

	//loader animation
	document.querySelector('.sk-cube-grid').style.display = 'block';
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		if (loading) {
			setTimeout(() => {
				setLoading(false);
				document.querySelector('.sk-cube-grid').style.display = 'none';
			}, 500);
		}
	}, [loading]);
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
						{posts.data.map((p) => (
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
						pageCount={pagination.totalPage}
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
