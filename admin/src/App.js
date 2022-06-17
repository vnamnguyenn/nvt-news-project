import ROUTES from "./routes/routes";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "../src/assets/sass/__main.scss";

const App = () => {
  return (
    <div>
      <>
        <Router>
          <ROUTES />
        </Router>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          limit={5}
        />
      </>
    </div>
  );
};

export default App;
