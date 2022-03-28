import React from 'react';
import {Routes, Route} from 'react-router-dom';
import DashBoard from '../pages/dashBoard/Dashboard';
import PostDetail from '../pages/posts/Details';
import ErrorPage from '../pages/notFound';
import Post from '../pages/posts/Index';

const ROUTES = () => {
	return (
		<Routes>
			<Route path="/" element={<DashBoard />} />
			<Route path="/post">
				<Route index element={<Post />} />
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
