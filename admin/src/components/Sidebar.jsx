import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import { NavLink } from "react-router-dom";
import { baseImageUrl } from "../requestMethods";
import ReactTooltip from "react-tooltip";

const Sidebar = () => {
  return (
    <div className="sidebar" id="mySidebar">
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
            <NavLink to={"/"}>
              <DashboardIcon className="icon" data-tip="Dashboard" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <p className="title">List</p>
          <li>
            <NavLink to={"/posts"}>
              <NewspaperOutlinedIcon className="icon" data-tip="Posts" />
              <span>Posts</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/categories"}>
              <CategoryOutlinedIcon className="icon" data-tip="Categories" />
              <span>Categories</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/tags"}>
              <LocalOfferOutlinedIcon className="icon" data-tip="Tags" />
              <span>Tags</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/backup"}>
              <BackupOutlinedIcon className="icon" data-tip="Backup" />
              <span>Backup</span>
            </NavLink>
          </li>
          <ReactTooltip />
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
