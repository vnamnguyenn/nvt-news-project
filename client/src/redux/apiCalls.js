import {
	loginFailure,
	loginStart,
	loginSuccess,
	logoutSuccess,
	updateProfileStart,
	updateProfileSuccess,
	updateProfileFailure,
} from './userRedux';

import {publicRequest, userRequest} from '../requestMethods';
import {toast} from 'react-toastify';
import {
	getPostFailure,
	getPoststart,
	getPostsuccess,
	getPostByIDstart,
	getPostByIDsuccess,
	getPostByIDFailure,
} from './postRedux';

import {
	getTagFailure,
	getTagstart,
	getTagsuccess,
	getTagByIDstart,
	getTagByIDsuccess,
	getTagByIDFailure,
} from './tagRedux';

import {
	addReadingPostFailure,
	addReadingPoststart,
	addReadingPostsuccess,
	deleteReadingPostFailure,
	deleteReadingPoststart,
	deleteReadingPostsuccess,
	getReadingPostFailure,
	getReadingPoststart,
	getReadingPostsuccess,
} from './readingListRedux';

import {
	getCategorystart,
	getCategoryFailure,
	getCategorysuccess,
	getCategoryByIDstart,
	getCategoryByIDsuccess,
	getCategoryByIDFailure,
} from './categoryRedux';
/*--------User--------*/
export const signup = async (dispatch, user) => {
	dispatch(loginStart());
	try {
		const res = await publicRequest.post('/signup', user);
		toast.success('Logged in successfull', {
			position: 'bottom-right',
			autoClose: 2500,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: false,
			progress: undefined,
		});
		dispatch(loginSuccess(res.data));
		window.location.replace('/');
	} catch (err) {
		toast.error('Something went wrong', {
			position: 'bottom-right',
			autoClose: 2500,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: false,
			progress: undefined,
		});
		dispatch(loginFailure());
	}
};
export const signin = async (dispatch, user) => {
	dispatch(loginStart());
	try {
		const res = await publicRequest.post('/signin', user);
		toast.success('Logged in successfull', {
			position: 'bottom-right',
			autoClose: 2500,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: false,
			progress: undefined,
		});
		dispatch(loginSuccess(res.data));
		window.location.replace('/');
	} catch (err) {
		toast.error('Email and/or Password wrong', {
			position: 'bottom-right',
			autoClose: 2500,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: false,
			progress: undefined,
		});
		dispatch(loginFailure());
	}
};

export const updateProfile = async (dispatch, user) => {
	dispatch(updateProfileStart());
	try {
		const res = await userRequest.patch('/auth/update_profile', user);
		dispatch(updateProfileSuccess(res.data));
		toast.success('User profile updated in successfully', {
			position: 'bottom-right',
			autoClose: 2500,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: false,
			progress: undefined,
		});
	} catch {
		toast.error('user profile update  is failed', {
			position: 'bottom-right',
			autoClose: 2500,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: false,
			progress: undefined,
		});
		dispatch(loginFailure());
	}
};
export const logout = (dispatch) => {
	dispatch(logoutSuccess());
};

/*--------Tag--------*/
export const getTags = async (dispatch) => {
	dispatch(getTagstart());
	try {
		const res = await publicRequest.get('/tag');
		dispatch(getTagsuccess(res.data));
	} catch (err) {
		dispatch(getTagFailure());
	}
};

/*--------Category--------*/
export const getCategories = async (dispatch) => {
	dispatch(getCategorystart());
	try {
		const res = await publicRequest.get('/category');
		dispatch(getCategorysuccess(res.data));
	} catch (err) {
		dispatch(getCategoryFailure());
	}
};
/*--------Post--------*/
export const getPosts = async (paramsString, dispatch) => {
	dispatch(getPoststart());
	try {
		const res = await publicRequest.get('/post?' + paramsString);
		dispatch(getPostsuccess(res.data));
	} catch (err) {
		dispatch(getPostFailure());
	}
};
export const getPostById = async (postId, dispatch) => {
	dispatch(getPostByIDstart());
	try {
		const res = await publicRequest.get('/post/' + postId);
		dispatch(getPostByIDsuccess(res.data));
	} catch (err) {
		dispatch(getPostByIDFailure());
	}
};
/*--------ReadingPost--------*/
export const getReadingList = async (dispatch) => {
	dispatch(getReadingPoststart());
	try {
		const res = await publicRequest.get('/reading_list');
		dispatch(getReadingPostsuccess(res.data));
	} catch (err) {
		dispatch(getReadingPostFailure());
	}
};
export const addReadingPost = async (post, dispatch) => {
	dispatch(addReadingPoststart());
	try {
		const res = await publicRequest.post('/reading_list/create/', post);
		dispatch(addReadingPostsuccess(res.data));
		toast.success('Post saved in successfully', {
			position: 'bottom-right',
			autoClose: 2500,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: false,
			progress: undefined,
		});
	} catch (err) {
		dispatch(addReadingPostFailure());
	}
};
export const deleteReadingPost = async (SaveID, dispatch) => {
	dispatch(addReadingPoststart());
	try {
		const res = await publicRequest.post('/reading_list/delete/' + SaveID);
		dispatch(addReadingPostsuccess(res.data));
		toast.success('Post removed in successfully', {
			position: 'bottom-right',
			autoClose: 2500,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: false,
			progress: undefined,
		});
	} catch (err) {
		dispatch(addReadingPostFailure());
	}
};
