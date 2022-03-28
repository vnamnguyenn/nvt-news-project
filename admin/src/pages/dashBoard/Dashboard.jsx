import Sidebar from "../../components/sidebar/Sidebar";
import './dashboard.scss'

const Dashboard = () => {
  return (
    <div className="dashboard">
        <Sidebar/>
        <div className="dashboard__container">Container</div>
    </div>
  )
}

export default Dashboard