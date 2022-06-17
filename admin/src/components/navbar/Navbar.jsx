import React, { useEffect, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DehazeIcon from "@mui/icons-material/Dehaze";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { useSelector } from "react-redux";
import { baseImageUrl } from "../../requestMethods";
import { logout } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./navbar.scss";

const Navbar = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [collapseDisplay, setcollapseDisplay] = useState(false);
  const [expandDisplay, setExpandDisplay] = useState(true);
  const coolapsed = localStorage.getItem("coolapsed");
  let sidebar = document.getElementById("mySidebar");
  let main = document.getElementById("main");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    logout(dispatch);
    navigate("/signin");
  };

  useEffect(() => {
    setTimeout(() => {
      if (coolapsed) {
        setExpandDisplay(false);
        setcollapseDisplay(true);
        sidebar.querySelector("#logo").classList.remove("d-none");
        sidebar.querySelector(".sidebar__logo").classList.add("d-none");
        sidebar.classList.add("hide-content");
        sidebar.classList.add("sidebar-collapse-show");
        main.classList.add("main-coolapse-show");
      }
    }, 100);
    return () => {};
  });

  const switchTheme = (e) => {
    e.preventDefault();
    setExpandDisplay((current) => !current);
    setcollapseDisplay((current) => !current);
    sidebar.querySelector("#logo").classList.toggle("d-none");
    sidebar.querySelector(".sidebar__logo").classList.toggle("d-none");
    sidebar.classList.toggle("hide-content");
    sidebar.classList.toggle("sidebar-collapse-show");
    main.classList.toggle("main-coolapse-show");

    // If the body has the class of light theme then add it to local Storage, if not remove it
    if (sidebar.classList.contains("sidebar-collapse-show")) {
      localStorage.setItem("coolapsed", "coolapsed");
    } else {
      localStorage.removeItem("coolapsed");
    }
  };

  const handleDropDown = () => {
    setOpenDropdown((current) => !current);
  };

  window.addEventListener("keyup", (event) => {
    if (event.key === "Escape") setOpenDropdown(false);
  });

  window.addEventListener("click", (e) => {
    if (!e.target.matches(".avatar")) setOpenDropdown(false);
  });

  return (
    <div className="navbar">
      <div className="navbar__wrapper">
        <div className="navbar-left">
          <div
            onClick={switchTheme}
            className={`${expandDisplay ? "" : "d-none"}`}
          >
            <DehazeIcon />
          </div>
          <div
            onClick={switchTheme}
            className={`${collapseDisplay ? "" : "d-none"}`}
          >
            <CloseRoundedIcon />
          </div>
          <div className="search">
            <input type="text" placeholder="search" />
            <SearchOutlinedIcon />
          </div>
        </div>
        <div className="navbar-right">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">10</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item dropdown">
            <div className="dropbtn" onClick={handleDropDown}>
              <img
                src={baseImageUrl + user?.exportData.Avatar}
                className="avatar"
                alt=""
              />
              <div className={`dropdown-content ${openDropdown ? "show" : ""}`}>
                <a href="#home/">Profile</a>
                <a href="#about/">About</a>
                <div onClick={handleClick}>Logout</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
