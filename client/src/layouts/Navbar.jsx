const Navbar = () => {
  return (
    <header className="header" id="header">
      <nav className="navbar container">
        <a href="./index.html">
          <h2 className="logo">NewsFlash</h2>
        </a>

        <div className="menu" id="menu">
          <ul className="list">
            <li className="list-item">
              <a href="/#" className="list-link current">
                Home
              </a>
            </li>
            <li className="list-item">
              <a href="/#" className="list-link">
                Categories
              </a>
            </li>
            <li className="list-item">
              <a href="/#" className="list-link">
                Reviews
              </a>
            </li>
            <li className="list-item">
              <a href="/#" className="list-link">
                News
              </a>
            </li>
            <li className="list-item">
              <a href="/#" className="list-link">
                Membership
              </a>
            </li>
            <li className="list-item">
              <a href="/#" className="list-link">
                Contact
              </a>
            </li>
            <li className="list-item screen-lg-hidden">
              <a href="./signin.html" className="list-link">
                Sign in
              </a>
            </li>
            <li className="list-item screen-lg-hidden">
              <a href="./signup.html" className="list-link">
                Sign up
              </a>
            </li>
          </ul>
        </div>

        <div className="list list-right">
          <button className="btn place-items-center" id="theme-toggle-btn">
            <i className="ri-sun-line sun-icon"></i>
            <i className="ri-moon-line moon-icon"></i>
          </button>

          <button className="btn place-items-center" id="search-icon">
            <i className="ri-search-line"></i>
          </button>

          <button
            className="btn place-items-center screen-lg-hidden menu-toggle-icon"
            id="menu-toggle-icon"
          >
            <i className="ri-menu-3-line open-menu-icon"></i>
            <i className="ri-close-line close-menu-icon"></i>
          </button>

          <a href="/#" className="list-link screen-sm-hidden">
            Sign in
          </a>
          <a href="/#" className="btn sign-up-btn fancy-border screen-sm-hidden">
            <span>Sign up</span>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
