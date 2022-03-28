import React, {Fragment} from "react";
import {Link, Outlet} from "react-router-dom";

function Post() {
	return (
		<Fragment className="posts">
			<div className="postNav">
				<Link to="/posts/search"> Search </Link>
				<Link to="/posts/list"> List </Link>
				<Link to="/posts/add"> Add </Link>
				<Link to="/posts/:id"> Detail </Link>
			</div>
			<Outlet />
		</Fragment>
	);
}

export default Post;
