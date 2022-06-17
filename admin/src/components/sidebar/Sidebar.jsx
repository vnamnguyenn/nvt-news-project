import React from "react";
import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import { Link } from "react-router-dom";
import { logout } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { baseImageUrl } from "../../requestMethods";
const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    logout(dispatch);
    navigate("/signin");
  };

  return (
    <div className="sidebar" id="mySidebar" style={{ width: "250px" }}>
      <div className="sidebar__top">
        <span className="sidebar__logo">NVTNews</span>
        <img
          className="d-none"
          id="logo"
          style={{ width: "40px" }}
          src={`${baseImageUrl}favicon.png`}
          alt=""
        />
      </div>
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
              <NewspaperOutlinedIcon className="icon" />
              <span>Posts</span>
            </Link>
          </li>
          <li>
            <Link to={"/category"}>
              <CategoryOutlinedIcon className="icon" />
              <span>Categories</span>
            </Link>
          </li>
          <li>
            <Link to={"/tags"}>
              <LocalOfferOutlinedIcon className="icon" />
              <span>Tags</span>
            </Link>
          </li>
          <li>
            <Link to={"/backup"}>
              <BackupOutlinedIcon className="icon" />
              <span>Backup</span>
            </Link>
          </li>
          {/* <p className="title">Users</p>
          <li onClick={handleClick}>
            <div>
              <ExitToAppIcon className="icon" />
              <span>Logout</span>
            </div>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
