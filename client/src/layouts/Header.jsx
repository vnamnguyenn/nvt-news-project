import DarkMode from '../components/DarkMode';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import {logout} from '../redux/apiCalls';
import SearchPost from '../pages/SearchPost';
import {useLocation} from 'react-router';
import {publicRequest} from '../requestMethods';
const Header = () => {
	const dispatch = useDispatch();
	const [posts, setPosts] = useState([]);

	const location = useLocation();
	document.querySelector('.sk-cube-grid').style.display = 'none';
	// Grab elements
	const selectElement = (selector) => {
		const element = document.querySelector(selector);
		if (element) return element;
		throw new Error(`Something went wrong! Make sure that ${selector} exists/is typed correctly.`);
	};

	const [searchTerm, setSearchTerm] = useState('');
	const handleChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const toggleMenu = () => {
		const mobileMenu = selectElement('#menu');
		const menuToggleIcon = selectElement('#menu-toggle-icon');
		mobileMenu.classList.toggle('activated');
		menuToggleIcon.classList.toggle('activated');
	};

	const formOpenBtn = () => {
		const searchContainer = selectElement('#search-form-container');
		searchContainer.classList.add('activated');
	};

	const formCloseBtn = () => {
		const searchContainer = selectElement('#search-form-container');
		searchContainer.classList.remove('activated');
	};

	window.addEventListener('keyup', (event) => {
		const searchContainer = selectElement('#search-form-container');
		if (event.key === 'Escape') searchContainer.classList.remove('activated');
	});

	const user = useSelector((state) => state.user.currentUser);

	const logOutBtn = (e) => {
		e.preventDefault();
		logout(dispatch);
	};

	return (
		<div>
			<header className="header" id="header">
				<nav className="navbar container">
					<Link to="/">
						<h2 className="logo">NVTNews</h2>
					</Link>

					<div className="menu" id="menu">
						<ul className="list">
							<li className="list-item">
								<Link to="/" className="list-link current">
									Home
								</Link>
							</li>
							<li className="list-item">
								<Link to="/category" className="list-link">
									Categories
								</Link>
							</li>
							<li className="list-item">
								<Link to="/post" className="list-link">
									News
								</Link>
							</li>
							<li className="list-item">
								<a href="/#" className="list-link">
									Videos
								</a>
							</li>
							<li className="list-item">
								<a href="/#" className="list-link">
									Contact
								</a>
							</li>
							{user ? (
								<ul>
									<li className="list-item screen-lg-hidden">
										<Link to="/profile" className="list-link">
											{user.exportData.FullName}
										</Link>
									</li>
									<li className="list-item screen-lg-hidden">
										<button onClick={logOutBtn} className="list-link">
											Sign out
										</button>
									</li>
								</ul>
							) : (
								<ul>
									<li className="list-item screen-lg-hidden">
										<Link
											to="/signin"
											state={{previosPage: location.pathname}}
											className="list-link"
										>
											Sign in
										</Link>
									</li>
									<li className="list-item screen-lg-hidden">
										<Link
											to="/signup"
											state={{previosPage: location.pathname}}
											className="list-link"
										>
											Sign up
										</Link>
									</li>
								</ul>
							)}
						</ul>
					</div>

					<div className="list list-right">
						<DarkMode />
						<button className="btn place-items-center" onClick={formOpenBtn}>
							<i className="ri-search-line"></i>
						</button>

						<button
							className="btn place-items-center screen-lg-hidden menu-toggle-icon"
							onClick={toggleMenu}
						>
							<i className="ri-menu-3-line open-menu-icon"></i>
							<i className="ri-close-line close-menu-icon"></i>
						</button>
						{user ? (
							<>
								<Link to="/profile" className="list-link screen-sm-hidden">
									{user.exportData.FullName}
								</Link>
								<div onClick={logOutBtn} className="btn sign-up-btn fancy-border screen-sm-hidden">
									<span>Sign out</span>
								</div>
							</>
						) : (
							<>
								<Link
									to="/signin"
									className="list-link screen-sm-hidden"
									state={{previosPage: location.pathname}}
								>
									Sign in
								</Link>
								<Link
									to="/signup"
									state={{previosPage: location.pathname}}
									className="btn sign-up-btn fancy-border screen-sm-hidden"
								>
									<span>Sign up</span>
								</Link>
							</>
						)}
					</div>
				</nav>
			</header>
			{/* search popup */}
			<div className="search-form-container container" id="search-form-container">
				<div className="form-container-inner">
					<input
						className="form-input"
						type="text"
						placeholder="What are you looking for?"
						value={searchTerm}
						onChange={handleChange}
					/>
					<Link
						to={`/search/${searchTerm}`}
						className="btn form-btn"
						onClick={formCloseBtn}
						type="button"
					>
						<i className="ri-search-line"></i>
					</Link>
					<span className="form-note">Or press ESC to close.</span>
				</div>
				<button className="btn form-close-btn place-items-center" onClick={formCloseBtn}>
					<i className="ri-close-line"></i>
				</button>
			</div>
		</div>
	);
};

export default Header;
