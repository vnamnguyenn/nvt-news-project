import React, { useState } from "react";
import "./navbar.scss";
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

const Navbar = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [collapseDisplay, setcollapseDisplay] = useState(false);
  const [expandDisplay, setExpandDisplay] = useState(true);
  const handleCollapseSidebar = () => {
    setExpandDisplay(false);
    setcollapseDisplay(true);
    let sidebar = document.getElementById("mySidebar");
    sidebar.querySelector("#logo").classList.remove("d-none");
    sidebar.querySelector(".sidebar__logo").classList.add("d-none");
    sidebar.style.width = "70px";
    sidebar.classList.add("hide-content");
    document.getElementById("main").style.marginLeft = "70px";
  };
  const handleExpandSidebar = () => {
    setExpandDisplay(true);
    setcollapseDisplay(false);
    let sidebar = document.getElementById("mySidebar");
    sidebar.style.width = "250px";
    sidebar.querySelector("#logo").classList.add("d-none");
    sidebar.querySelector(".sidebar__logo").classList.remove("d-none");
    sidebar.classList.remove("hide-content");
    document.getElementById("main").style.marginLeft = "250px";
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
            onClick={handleCollapseSidebar}
            className={`${expandDisplay ? "" : "d-none"}`}
          >
            <DehazeIcon />
          </div>
          <div
            onClick={handleExpandSidebar}
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
                <a href="#home/">Home</a>
                <a href="#about/">About</a>
                <a href="#contact/">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
