import {createSlice} from '@reduxjs/toolkit';

const commentSlice = createSlice({
	name: 'user',
	initialState: {
		currentUser: null,
		isFetching: false,
		error: false,
	},
	reducers: {
		commentStart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		commentSuccess: (state, action) => {
			state.isFetching = false;
		},
		commentFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},
	},
});

export const {commentStart, commentSuccess, commentFailure} = commentSlice.actions;
export default commentSlice.reducer;
