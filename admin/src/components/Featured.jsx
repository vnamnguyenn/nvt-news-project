import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import "react-circular-progressbar/dist/styles.css";

const Featured = () => {
  return (
    <div className="featured">
      <div className="featured__top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="featured__bottom">
        <div className="featured__chart">
          <CircularProgressbar value={70} text="70%" strokeWidth={5} />
        </div>
        <p className="featured__title">Total sales made today</p>
        <p className="featured__amount">$420</p>
        <p className="featured__desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="featured__summary">
          <div className="item">
            <div className="item__title">Target</div>
            <div className="item__result negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="result-amount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="item__title">Target</div>
            <div className="item__result positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="result-amount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="item__title">Target</div>
            <div className="item__result positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="result-amount">$12.4k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
