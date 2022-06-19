import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import { Link } from "react-router-dom";

const Widget = ({ type, couter }) => {
  let data;
  const diff = 0;
  switch (type) {
    case "posts":
      data = {
        title: "POSTS",
        linkTitle: "See all post",
        linkTagert: "/posts",
        couter: couter,
        icon: (
          <NewspaperOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "tags":
      data = {
        title: "TAGS",
        linkTitle: "See all tag",
        linkTagert: "/tags",
        couter: couter,
        icon: (
          <LocalOfferOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "categories":
      data = {
        title: "CATEGORIES",
        linkTitle: "See all category",
        linkTagert: "/categories",
        couter: couter,
        icon: (
          <CategoryOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "backup":
      data = {
        title: "BACKUP",
        linkTitle: "See all backup",
        linkTagert: "/backup",
        couter: couter,
        icon: (
          <BackupOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }
  return (
    <div className="widget">
      <div className="widget__left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.couter}</span>
        <Link to={data.linkTagert} className="link">
          {data.linkTitle}
        </Link>
      </div>
      <div className="widget__right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff}
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
