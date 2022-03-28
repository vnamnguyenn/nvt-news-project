import React from "react";
import {Routes, Route} from "react-router-dom";
import DashBoard from "../pages/dashBoard/Dashboard";
import ListPost from "../pages/posts/listPost";
import PostDetail from "../pages/posts/postDisplay";
// import SearchPost from "../Pages/Posts/searchPost";
// import AddPost from "../Pages/Posts/addPost";
import ErrorPage from "../pages/notFound";

const ROUTES = () => {
	return (
		<Routes>
			<Route path="/" element={<DashBoard />} />
			<Route path="/posts">
				<Route index element={<ListPost />} />
				<Route path=":id" element={<PostDetail />} />
			</Route>
			<Route path="*" element={<ErrorPage />} />
		</Routes>
	);
};

/*
const ROUTES = () => {
	let routes = useRoutes([
		{
			path: "/",
			element: <DashBoard/>
		},
		{
			path: "/posts",
			element: <Post />,
			children: [
				{
					path: "list",
					element: <ListPost/>
				},
				{
					path: ":id",
					element: <PostDetail/>
				}
			],
		},
		{
			path: '*',
			element: <ErrorPage/>
		},
	]);
	return routes;
};
*/
export default ROUTES;
