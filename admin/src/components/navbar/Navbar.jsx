import React, { useState } from "react";
import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DehazeIcon from "@mui/icons-material/Dehaze";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { useSelector } from "react-redux";
import { baseImageUrl } from "../../requestMethods";

const Navbar = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [openDropdown, setOpenDropdown] = useState(false);
  const handleSidebar = () => {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  };
  const handleDropDown = () => {
    setOpenDropdown((current) => !current);
  };

  const selectElement = (selector) => {
    const element = document.querySelector(selector);
    if (element) return element;
    // throw new Error(
    //   `Something went wrong! Make sure that ${selector} exists/is typed correctly.`
    // );
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
          <div onClick={handleSidebar}>
            <DehazeIcon />
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
