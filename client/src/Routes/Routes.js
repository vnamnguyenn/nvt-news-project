import React from "react";
import {useRoutes} from "react-router-dom";
import DashBoard from "../Pages/DashBoard/index";
import Post from "../Pages/Posts/post";
import ListPost from "../Pages/Posts/listPost";
import PostDetail from "../Pages/Posts/postDisplay";
import SearchPost from "../Pages/Posts/searchPost";
import AddPost from "../Pages/Posts/addPost";
import ErrorPage from "../Pages/NotFound";
const ROUTES = () => {
	let routes = useRoutes([
		{
			path: "/",
			element: <DashBoard/>,
		},
		{
			path: "/posts",
			element: <Post />,
			children: [
				{
					path: "list",
					element: <ListPost/>,
				},
				{
					path: ":id",
					element: <PostDetail/>,
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
export default ROUTES;
