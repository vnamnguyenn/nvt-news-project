import {createSlice} from '@reduxjs/toolkit';

export const postSlice = createSlice({
	name: 'post',
	initialState: {
		posts: [],
		isFetching: false,
		error: false,
	},
	reducers: {
		//GET ALL
		getPoststart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		getPostsuccess: (state, action) => {
			state.isFetching = false;
			state.posts = action.payload;
		},
		getPostFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},
		//GET BY ID
		getPostByIDstart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		getPostByIDsuccess: (state, action) => {
			state.isFetching = false;
			state.posts.splice(
				state.posts.findIndex((item) => item.PostID === action.payload),
				1,
			);
		},
		getPostByIDFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},
	},
});

export const {
	getPostByIDstart,
	getPostByIDsuccess,
	getPostByIDFailure,
	getPoststart,
	getPostsuccess,
	getPostFailure,
} = postSlice.actions;

export default postSlice.reducer;
