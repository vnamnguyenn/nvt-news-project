import React from "react";
import Post from "./Posts";

export default function ListPost({listPost,onCheckBtnClick}) {
	return (
		<>
			{listPost.map((post) => (
				<Post key={post.id}  post={post} onCheckBtnClick= {onCheckBtnClick} />
			))}
		</>
	);
}
