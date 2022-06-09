import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutSuccess,
} from "./userRedux";

import { publicRequest, userRequest } from "../requestMethods";
import { toast } from "react-toastify";
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
} from "./postRedux";

import {
  getTagFailure,
  getTagstart,
  getTagsuccess,
  deleteTagFailure,
  deleteTagstart,
  deleteTagsuccess,
  updateTagFailure,
  updateTagstart,
  updateTagsuccess,
  addTagFailure,
  addTagstart,
  addTagsuccess,
} from "./tagRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/signin", user);
    toast.success("Logged in successfull", {
      position: "bottom-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
    dispatch(loginSuccess(res.data));
    window.location.replace("/posts");
  } catch (err) {
    toast.error("Email and/or Password wrong", {
      position: "bottom-right",
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

export const getTags = async (dispatch) => {
  dispatch(getTagstart());
  try {
    const res = await publicRequest.get("/tag");
    dispatch(getTagsuccess(res.data));
  } catch (err) {
    dispatch(getTagFailure());
  }
};

export const addTag = async (tag, dispatch) => {
  dispatch(addTagstart());
  try {
    const res = await userRequest.post(`/tag/create`, tag);
    dispatch(addTagsuccess(res.data));
  } catch (err) {
    dispatch(addTagFailure());
  }
};

export const updateTag = async (TagId, tagName, tag, dispatch) => {
  dispatch(updateTagstart());
  try {
    await userRequest.patch(`/tag/edit/${TagId}`, tag);
    dispatch(updateTagsuccess({ TagId, tag }));
    toast.success(`Update '${tagName}' in successfully`, {
      position: "bottom-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  } catch (err) {
    dispatch(updateTagFailure());
  }
};

export const deleteTag = async (tagId, tagName, dispatch) => {
  dispatch(deleteTagstart());
  try {
    await userRequest.delete(`/tag/delete/${tagId}`);
    dispatch(deleteTagsuccess(tagId));
    toast.success(`Delete '${tagName}' in successfully`, {
      position: "bottom-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  } catch (err) {
    dispatch(deleteTagFailure());
  }
};

export const getPosts = async (dispatch) => {
  dispatch(getPoststart());
  try {
    const res = await publicRequest.get("/post_admin");
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
    await userRequest.patch(`/post/edit/${postID}`, post);
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
