import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import { React, useEffect } from "react";
import Chart from "../../components/chart/Chart";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Table from "../../components/table/Table";
import "./dashboard.scss";
const Dashboard = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Admin Dashboard";

    if (currentUser === null) {
      return navigate("/signin");
    }
  }, [currentUser, navigate]);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard__container">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="list-container">
          <div className="list-container__item">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
