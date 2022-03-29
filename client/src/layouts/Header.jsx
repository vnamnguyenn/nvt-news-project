import DarkMode from '../components/DarkMode';
import {Link} from 'react-router-dom';
const Header = () => {
	// Grab elements
	const selectElement = (selector) => {
		const element = document.querySelector(selector);
		if (element) return element;
		throw new Error(`Something went wrong! Make sure that ${selector} exists/is typed correctly.`);
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
								<a href="/#" className="list-link">
									Categories
								</a>
							</li>
							<li className="list-item">
								<a href="/#" className="list-link">
									News
								</a>
							</li>
							<li className="list-item">
								<a href="/#" className="list-link">
									Videos
								</a>
							</li>
							<li className="list-item">
								<a href="/#" className="list-link">
									Audio
								</a>
							</li>
							<li className="list-item">
								<a href="/#" className="list-link">
									Contact
								</a>
							</li>
							<li className="list-item screen-lg-hidden">
								<Link to="/login" className="list-link">
									Sign in
								</Link>
							</li>
							<li className="list-item screen-lg-hidden">
								<Link to="/register" className="list-link">
									Sign up
								</Link>
							</li>
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

						<Link to="/signin" className="list-link screen-sm-hidden">
							Sign in
						</Link>
						<Link to="/signup" className="btn sign-up-btn fancy-border screen-sm-hidden">
							<span>Sign up</span>
						</Link>
					</div>
				</nav>
			</header>
			<div className="search-form-container container" id="search-form-container">
				<div className="form-container-inner">
					<form action="" className="form">
						<input className="form-input" type="text" placeholder="What are you looking for?" />
						<button className="btn form-btn" type="submit">
							<i className="ri-search-line"></i>
						</button>
					</form>
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
