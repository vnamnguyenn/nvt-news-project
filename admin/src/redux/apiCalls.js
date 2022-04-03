import { loginFailure, loginStart, loginSuccess } from './userRedux';
import { publicRequest, userRequest } from '../requestMethods';
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
    res.data && window.location.replace('/posts');
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const getPosts = async (dispatch) => {
  dispatch(getPoststart());
  try {
    const res = await publicRequest.get('/post');
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
