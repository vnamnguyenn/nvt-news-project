import React from "react";
import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FeedIcon from "@mui/icons-material/Feed";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CategoryIcon from "@mui/icons-material/Category";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { logout } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    logout(dispatch);
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <span className="sidebar__logo">NVTNews</span>
      </div>
      <hr />
      <div className="sidebar__center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <Link to={"/"}>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </Link>
          </li>
          <p className="title">List</p>
          <li>
            <Link to={"/posts"}>
              <FeedIcon className="icon" />
              <span>Posts</span>
            </Link>
          </li>
          <li>
            <Link to={"/category"}>
              <CategoryIcon className="icon" />
              <span>Categories</span>
            </Link>
          </li>
          <li>
            <Link to={"/tags"}>
              <LocalOfferIcon className="icon" />
              <span>Tags</span>
            </Link>
          </li>
          <p className="title">Users</p>
          <li onClick={handleClick}>
            <div>
              <ExitToAppIcon className="icon" />
              <span>Logout</span>
            </div>
          </li>
        </ul>
      </div>
      <div className="sidebar__bottom">
        <div className="sidebar__bottom-colorOption"></div>
        <div className="sidebar__bottom-colorOption"></div>
        <div className="sidebar__bottom-colorOption"></div>
      </div>
    </div>
  );
};

export default Sidebar;
