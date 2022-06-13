import {createSlice} from '@reduxjs/toolkit';

export const categoriesSlice = createSlice({
	name: 'category',
	initialState: {
		categories: [],
		isFetching: false,
		error: false,
	},
	reducers: {
		//GET ALL
		getCategorystart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		getCategorysuccess: (state, action) => {
			state.isFetching = false;
			state.categories = action.payload;
		},
		getCategoryFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},
		//GET BY ID
		getCategoryByIDstart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		getCategoryByIDsuccess: (state, action) => {
			state.isFetching = false;
			state.categories.splice(
				state.categories.findIndex((item) => item.CategoryId === action.payload),
				1,
			);
		},
		getCategoryByIDFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},
	},
});

export const {
	getCategoryByIDstart,
	getCategoryByIDsuccess,
	getCategoryByIDFailure,
	getCategorystart,
	getCategorysuccess,
	getCategoryFailure,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
