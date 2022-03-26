import React, {Fragment} from "react";
import {Routes, Route} from "react-router-dom";
import Navigation from "./Pages/Navigation";
import Home from "./Pages/DashBoard/index";
import Post from "./Pages/Post/index";
import ErrorPage from "./Pages/Error";

const App = () => {
	return (
		<Fragment>
			<Navigation />
			<Routes>
				<Route path="/" element={<Home/>} />
				<Route path="/post/:postSlug" element={<Post/>} />
				<Route path="*" element={<ErrorPage/>} />
			</Routes>
		</Fragment>
	);
};
export default App;
