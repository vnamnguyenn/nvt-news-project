import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/SignIn';
import NotFound from '../pages/NotFound';
import Post from '../pages/Post';
import Register from '../pages/SignUp';

const ROUTES = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/post">
				<Route index element={<Post />} />
				{/* <Route path=":id" element={<Post />} /> */}
			</Route>
            <Route path="/signin" element={<Login />}/>
            <Route path="/signup" element={<Register />}/>
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default ROUTES;
