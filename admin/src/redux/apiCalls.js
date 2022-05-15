import { loginFailure, loginStart, loginSuccess, logoutSuccess } from './userRedux';
import { publicRequest, userRequest } from '../requestMethods';
import { toast } from 'react-toastify';
import {
  getPostFailure,
  getPoststart,
  getPostsuccess,
  deletePostFailure,
  deletePoststart,
  deletePostsuccess,
  updatePostFailure,
  updatePoststart,
  updatePostsuccess,
  addPostFailure,
  addPoststart,
  addPostsuccess,
} from './postRedux';

export const login = async (dispatch, user) => {
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
    window.location.replace('/posts');
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

export const logout = (dispatch) => {
  window.location.replace('/signin');
  dispatch(logoutSuccess());
};

export const getPosts = async (dispatch) => {
  dispatch(getPoststart());
  try {
    const res = await publicRequest.get('/post_admin');
    dispatch(getPostsuccess(res.data));
  } catch (err) {
    dispatch(getPostFailure());
  }
};

export const addPost = async (post, dispatch) => {
  dispatch(addPoststart());
  try {
    const res = await userRequest.post(`/post/create`, post);
    dispatch(addPostsuccess(res.data));
  } catch (err) {
    dispatch(addPostFailure());
  }
};

export const updatePost = async (postID, post, dispatch) => {
  dispatch(updatePoststart());
  try {
    const res = await userRequest.patch(`/post/edit/${postID}`, post);
    dispatch(updatePostsuccess({ postID, post }));
  } catch (err) {
    dispatch(updatePostFailure());
  }
};

export const deletePost = async (postID, dispatch) => {
  dispatch(deletePoststart());
  try {
    await userRequest.delete(`/post/delete/${postID}`);
    dispatch(deletePostsuccess(postID));
  } catch (err) {
    dispatch(deletePostFailure());
  }
};

export const getTags = async () => {
  try {
    return await publicRequest.get('/tag');
  } catch (err) {
    console.log(err);
  }
};
