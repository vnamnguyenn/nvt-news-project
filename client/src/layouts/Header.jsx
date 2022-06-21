import DarkMode from "../components/DarkMode";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { logout } from "../redux/apiCalls";
import { useLocation, useNavigate } from "react-router";
import { publicRequest } from "../requestMethods";
const Header = () => {
  const dispatch = useDispatch();
  // const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [display, setDisplay] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [options, setOptions] = useState();
  document.querySelector(".sk-cube-grid").style.display = "none";
  // Grab elements
  const selectElement = (selector) => {
    const element = document.querySelector(selector);
    if (element) return element;
    // throw new Error(`Something went wrong! Make sure that ${selector} exists/is typed correctly.`);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      await publicRequest.get("/post").then((res) => {
        setOptions(res.data);
      });
    };
    fetchPosts();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm !== "") {
      navigate("/search?q=" + searchTerm, {
        state: { searchParam: e.target[0].value },
      });
      formCloseBtn();
      setSearchTerm("");
      setDisplay(false);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value !== "") {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  };

  const toggleMenu = () => {
    setIsActive((current) => !current);
  };

  const formOpenBtn = () => {
    const searchContainer = selectElement("#search-form-container");
    searchContainer.classList.add("activated");
  };

  const formCloseBtn = () => {
    const searchContainer = selectElement("#search-form-container");
    searchContainer.classList.remove("activated");
  };

  window.addEventListener("keyup", (event) => {
    const searchContainer = selectElement("#search-form-container");
    if (event.key === "Escape") searchContainer.classList.remove("activated");
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

          <div className={`menu ${isActive ? "activated" : ""}`} id="menu">
            <ul className="list">
              <li className="list-item">
                <Link to="/" className="list-link">
                  Home
                </Link>
              </li>
              <li className="list-item">
                <Link to="/category" className="list-link">
                  Categories
                </Link>
              </li>
              <li className="list-item">
                <Link to="/tag" className="list-link">
                  Tags
                </Link>
              </li>
              <li className="list-item">
                <Link to="/post" className="list-link">
                  News
                </Link>
              </li>
              <li className="list-item">
                <div className="list-link">Videos</div>
              </li>
              <li className="list-item">
                <div className="list-link">Contact</div>
              </li>
              {user ? (
                <>
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
                </>
              ) : (
                <>
                  <li className="list-item screen-lg-hidden">
                    <Link
                      to="/signin"
                      state={{ previousPage: location.pathname }}
                      className="list-link"
                    >
                      Sign in
                    </Link>
                  </li>
                  <li className="list-item screen-lg-hidden">
                    <Link
                      to="/signup"
                      state={{ previousPage: location.pathname }}
                      className="list-link"
                    >
                      Sign up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="list list-right">
            <DarkMode />
            <button className="btn place-items-center" onClick={formOpenBtn}>
              <i className="ri-search-line"></i>
            </button>

            <button
              className={`btn place-items-center screen-lg-hidden menu-toggle-icon ${
                isActive ? "activated" : ""
              }`}
              onClick={toggleMenu}
            >
              <i className="ri-menu-3-line open-menu-icon"></i>
              <i className="ri-close-line close-menu-icon"></i>
            </button>
            {user ? (
              <>
                <div className="dropdown" style={{ float: "right" }}>
                  <Link to="/profile" className="dropbtn">
                    {user.exportData.FullName}
                  </Link>
                  <div className="dropdown-content">
                    <Link to="/profile">Profile</Link>
                    <Link to="/readinglist">Reading List</Link>
                  </div>
                </div>
                <div
                  onClick={logOutBtn}
                  className="btn sign-up-btn fancy-border screen-sm-hidden"
                >
                  <span>Sign out</span>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="list-link screen-sm-hidden"
                  state={{ previousPage: location.pathname }}
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  state={{ previousPage: location.pathname }}
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
      <form onSubmit={(e) => handleSubmit(e)}>
        <div
          className="search-form-container container"
          id="search-form-container"
        >
          <div className="form-container-inner search-form-inner">
            <input
              className="form-input"
              type="text"
              placeholder="What are you looking for?"
              value={searchTerm}
              onChange={handleChange}
            />
            {display && (
              <div className="postContainer">
                <div
                  className="autoContainer"
                  style={{
                    height:
                      options.filter(
                        ({ PostTitle }) =>
                          PostTitle.toLowerCase().indexOf(
                            searchTerm.toLowerCase()
                          ) > -1
                      ).length > 0
                        ? "300px"
                        : "unset",
                  }}
                >
                  {options
                    .filter(
                      ({ PostTitle }) =>
                        PostTitle.toLowerCase().indexOf(
                          searchTerm.toLowerCase()
                        ) > -1
                    )
                    .map((value, i) => {
                      return (
                        <Link
                          to={`/search?q=${value.PostTitle}`}
                          state={{ searchParam: value.PostTitle }}
                          onClick={formCloseBtn}
                          className="option"
                          tabIndex="0"
                          key={i}
                        >
                          <span>{value.PostTitle}</span>
                        </Link>
                      );
                    })}
                </div>
              </div>
            )}
            <Link
              to={`/search?q=${searchTerm}`}
              state={{ searchParam: searchTerm }}
              className="btn form-btn"
              onClick={formCloseBtn}
              type="submit"
              style={{ marginTop: "20px" }}
            >
              <i className="ri-search-line"></i>
            </Link>
            <span className="form-note">Or press ESC to close.</span>
          </div>
          <button
            className="btn form-close-btn place-items-center"
            type="button"
            onClick={formCloseBtn}
          >
            <i className="ri-close-line"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Header;
