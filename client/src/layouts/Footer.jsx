const Footer = () => {
	return (
		<footer className="footer section" id="footer">
			<div className="footer-container container d-grid">
				<div className="company-data">
					<a href="./index.html">
						<h2 className="logo">NVTNews</h2>
					</a>
					<p className="company-description">
						NVTNews - Reporting on the business of technology, startups, venture capital funding,
						and Silicon Valley
					</p>

					<ul className="list social-media">
						<li className="list-item">
							<a href="/#" className="list-link">
								<i className="ri-instagram-line"></i>
							</a>
						</li>
						<li className="list-item">
							<a href="/#" className="list-link">
								<i className="ri-facebook-circle-line"></i>
							</a>
						</li>
						<li className="list-item">
							<a href="/#" className="list-link">
								<i className="ri-twitter-line"></i>
							</a>
						</li>
						<li className="list-item">
							<a href="/#" className="list-link">
								<i className="ri-pinterest-line"></i>
							</a>
						</li>
					</ul>

					<span className="copyright-notice">
						&copy;{new Date().getFullYear()} NVTNews. All rights reserved.
					</span>
				</div>

				<div>
					<h6 className="title footer-title">Categories</h6>

					<ul className="footer-list list">
						<li className="list-item">
							<a href="/#" className="list-link">
								Travel
							</a>
						</li>
						<li className="list-item">
							<a href="/#" className="list-link">
								Food
							</a>
						</li>
						<li className="list-item">
							<a href="/#" className="list-link">
								Technology
							</a>
						</li>
						<li className="list-item">
							<a href="/#" className="list-link">
								Health
							</a>
						</li>
						<li className="list-item">
							<a href="/#" className="list-link">
								Nature
							</a>
						</li>
						<li className="list-item">
							<a href="/#" className="list-link">
								Fitness
							</a>
						</li>
					</ul>
				</div>

				<div>
					<h6 className="title footer-title">Useful links</h6>

					<ul className="footer-list list">
						<li className="list-item">
							<a href="/#" className="list-link">
								Home
							</a>
						</li>
						<li className="list-item">
							<a href="/#" className="list-link">
								Elements
							</a>
						</li>
						<li className="list-item">
							<a href="/#" className="list-link">
								Tags
							</a>
						</li>
						<li className="list-item">
							<a href="/#" className="list-link">
								Authors
							</a>
						</li>
						<li className="list-item">
							<a href="/#" className="list-link">
								Membership
							</a>
						</li>
					</ul>
				</div>

				<div>
					<h6 className="title footer-title">Company</h6>

					<ul className="footer-list list">
						<li className="list-item">
							<a href="/#" className="list-link">
								Contact us
							</a>
						</li>
						<li className="list-item">
							<a href="/#" className="list-link">
								F.A.Q
							</a>
						</li>
						<li className="list-item">
							<a href="/#" className="list-link">
								Careers
							</a>
						</li>
						<li className="list-item">
							<a href="/#" className="list-link">
								Authors
							</a>
						</li>
						<li className="list-item">
							<a href="/#" className="list-link">
								Memberships
							</a>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
