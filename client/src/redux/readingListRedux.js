import {createSlice} from '@reduxjs/toolkit';

export const readingListSlice = createSlice({
	name: 'reading',
	initialState: {
		readingList: [],
		isFetching: false,
		error: false,
	},
	reducers: {
		//GET ALL
		getReadingPoststart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		getReadingPostsuccess: (state, action) => {
			state.isFetching = false;
			state.readingList = action.payload;
		},
		getReadingPostFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},
		//DELETE
		deleteReadingPoststart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		deleteReadingPostsuccess: (state, action) => {
			state.isFetching = false;
			state.readingList.splice(
				state.readingList.findIndex((item) => item.SavePostID === action.payload),
				1,
			);
		},
		deleteReadingPostFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},
		//CREATE
		addReadingPoststart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		addReadingPostsuccess: (state, action) => {
			state.isFetching = false;
			state.readingList.push(action.payload);
		},
		addReadingPostFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},
	},
});

export const {
	deleteReadingPostFailure,
	deleteReadingPostsuccess,
	deleteReadingPoststart,
	addReadingPostFailure,
	addReadingPoststart,
	addReadingPostsuccess,
	getReadingPoststart,
	getReadingPostFailure,
	getReadingPostsuccess,
} = readingListSlice.actions;

export default readingListSlice.reducer;
