import {createSlice} from '@reduxjs/toolkit';

export const tagSlice = createSlice({
	name: 'tag',
	initialState: {
		tags: [],
		isFetching: false,
		error: false,
	},
	reducers: {
		//GET ALL
		getTagstart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		getTagsuccess: (state, action) => {
			state.isFetching = false;
			state.tags = action.payload;
		},
		getTagFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},
		//GET BY ID
		getTagByIDstart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		getTagByIDsuccess: (state, action) => {
			state.isFetching = false;
			state.tags.splice(
				state.tags.findIndex((item) => item.TagId === action.payload),
				1,
			);
		},
		getTagByIDFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},
	},
});

export const {
	getTagByIDstart,
	getTagByIDsuccess,
	getTagByIDFailure,
	getTagstart,
	getTagsuccess,
	getTagFailure,
} = tagSlice.actions;

export default tagSlice.reducer;
