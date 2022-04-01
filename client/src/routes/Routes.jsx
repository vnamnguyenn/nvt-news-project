import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Signin from '../pages/SignIn';
import NotFound from '../pages/NotFound';
import Posts from '../pages/Posts';
import Post from '../pages/Post';
import Signup from '../pages/SignUp';
import Categories from '../pages/Categories';
import Category from '../pages/Category';

const ROUTES = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />

			<Route path="/signin" element={<Signin />} />
			<Route path="/signup" element={<Signup />} />

			<Route path="/category">
				<Route index element={<Categories />} />
				<Route path=":id" element={<Category />} />
			</Route>

			<Route path="/post">
				<Route index element={<Posts />} />
				<Route path=":id" element={<Post />} />
			</Route> 

			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default ROUTES;
