import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Signin from '../pages/SignIn';
import NotFound from '../pages/NotFound';
import News from '../pages/News';
import NewsList from '../pages/NewsList';
import Signup from '../pages/SignUp';
import CategoryList from '../pages/CategoryList';

const ROUTES = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />

			<Route path="/signin" element={<Signin />} />
			<Route path="/signup" element={<Signup />} />

			<Route path="/category">
				<Route index element={<CategoryList />} />
				<Route path=":id" element={<CategoryList />} />
			</Route>

			<Route path="/news">
				<Route index element={<NewsList />} />
				<Route path=":as" element={<News />} />
			</Route> 


			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default ROUTES;
