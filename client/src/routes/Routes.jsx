import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Signin from '../pages/SignIn';
import NotFound from '../pages/NotFound';
import Posts from '../pages/Posts';
import Post from '../pages/Post';
import Signup from '../pages/SignUp';
import Categories from '../pages/Categories';
import PostsCategory from '../pages/PostsCategory';
import PostsTag from '../pages/PostsTag';
import SearchPost from '../pages/SearchPost';
import Profile from '../pages/Profile';
import ReadingList from '../pages/ReadingList';
import PostsAuthor from '../pages/PostsAuthor';
import Tags from '../pages/Tags';

const ROUTES = () => {
	return (
		<Routes>
			<Route path="*" element={<NotFound />} />
			<Route path="/" element={<Home />} />

			<Route path="/profile" element={<Profile />} />
			<Route path="/readinglist" element={<ReadingList />} />

			<Route path="/signin" element={<Signin />} />
			<Route path="/signup" element={<Signup />} />

			<Route path="/category">
				<Route index element={<Categories />} />
				<Route path=":id" element={<PostsCategory />} />
			</Route>

			<Route path="/tag">
				<Route index element={<Tags />} />
				<Route path=":id" element={<PostsTag />} />
			</Route>
			<Route path="/tag/:id" element={<PostsTag />} />

			<Route path="/post">
				<Route index element={<Posts />} />
				<Route path=":id" element={<Post />} />
			</Route>

			<Route path="/author/:authorId" element={<PostsAuthor />} />

			<Route path="/search" element={<SearchPost />} />
		</Routes>
	);
};

export default ROUTES;
