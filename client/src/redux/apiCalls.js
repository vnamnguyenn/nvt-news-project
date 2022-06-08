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

export const login = async (dispatch, user) => {
	dispatch(loginStart());
	try {
		const res = await publicRequest.post('/signin', user);
		dispatch(loginSuccess(res.data));
		toast.success('Logged in successfully', {
			position: 'bottom-right',
			autoClose: 2500,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: false,
			progress: undefined,
		});
		// window.history.go(-1);
		window.location.replace('/');
	} catch (err) {
		toast.error('Email and/or Password wrong!', {
			position: 'bottom-right',
			autoClose: 2000,
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

		toast.success('Update profile in successfully', {
			position: 'bottom-right',
			autoClose: 2500,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: false,
			progress: undefined,
		});
		dispatch(updateProfileSuccess(res.data));
	} catch (err) {
		toast.error('Update profile is failed', {
			position: 'bottom-right',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: false,
			progress: undefined,
		});
		dispatch(updateProfileFailure());
	}
};

export const logout = (dispatch) => {
	dispatch(logoutSuccess());
	toast.success('Logged out in successfully', {
		position: 'bottom-right',
		autoClose: 2500,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: false,
		progress: undefined,
	});
};
