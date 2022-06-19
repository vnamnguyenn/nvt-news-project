import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import {useCallback, useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {baseImageUrl, publicRequest} from '../requestMethods';
import ReactPaginate from 'react-paginate';

const Categories = () => {
	const [loading, setLoading] = useState(true);
	const [totalPage, setTotalPage] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [data, setData] = useState([]);
	document.querySelector('.sk-cube-grid').style.display = 'block';
	useEffect(() => {
		document.title = 'Categories';
		if (loading) {
			setTimeout(() => {
				setLoading(false);
				document.querySelector('.sk-cube-grid').style.display = 'none';
			}, 500);
		}
		const getCategories = async () => {
			await publicRequest.get('/category').then((res) => {
				const limit = 12;
				const startIndex = (currentPage - 1) * limit;
				const endIndex = currentPage * limit;
				setTotalPage(Math.ceil(res.data.length / limit));
				setData(res.data.slice(startIndex, endIndex));
			});
		};
		getCategories();
	}, [loading, currentPage]);

	function handlePageChange(newPage) {
		setCurrentPage(newPage.selected + 1);
	}

	if (loading) {
		return null;
	}

	return (
		<div>
			<Header />
			<section className="popular-tags section section-header-offset">
				<div className="container padding-bottom">
					<div className="popular-tags-container d-grid">
						{data.map((cat) => (
							<Link
								to={cat.CategoryId}
								className="article"
								state={{categoryName: cat.CategoryName}}
								key={cat.CategoryId}
							>
								<span className="tag-name">{cat.CategoryName}</span>
								<img
									src={baseImageUrl + cat.Thumbnail}
									alt={cat.CategoryName}
									className="article-image"
								/>
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
};

export default Categories;
