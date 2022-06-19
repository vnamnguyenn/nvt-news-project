import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Widget from "../../components/Widget";
import Featured from "../../components/Featured";
import { React, useEffect } from "react";
import Chart from "../../components/Chart";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table";
import {
  getbackup,
  getCategories,
  getPosts,
  getTags,
} from "../../redux/apiCalls";
const Dashboard = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const posts = useSelector((state) => state.post.posts);
  const tags = useSelector((state) => state.tag.tags);
  const categories = useSelector((state) => state.category.categories);
  const backup = useSelector((state) => state.backup.backup);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "Admin Dashboard";
    getPosts(dispatch);
    getTags(dispatch);
    getCategories(dispatch);
    getbackup(dispatch);
    if (!currentUser) {
      return navigate("/signin");
    }
  }, [currentUser, navigate, dispatch]);
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard__container" id="main">
        <Navbar />
        <div className="widgets">
          <Widget type="posts" couter={posts.length} />
          <Widget type="tags" couter={tags.length} />
          <Widget type="categories" couter={categories.length} />
          <Widget type="backup" couter={backup.length} />
        </div>
        <div className="charts">
          <Featured />
          <Chart posts={posts} title="Last 6 Months (Revenue)" aspect={2 / 1} />
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
