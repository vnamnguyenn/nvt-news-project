import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutSuccess,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
} from "./userRedux";

import { publicRequest, userRequest } from "../requestMethods";
import { toast } from "react-toastify";
import { getPostFailure, getPoststart, getPostsuccess } from "./postRedux";
import { getTagFailure, getTagstart, getTagsuccess } from "./tagRedux";

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
} from "./readingListRedux";

import {
  getCategorystart,
  getCategoryFailure,
  getCategorysuccess,
} from "./categoryRedux";

/*--------User--------*/
export const signup = async (dispatch, user, location) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/signup", user);
    dispatch(loginSuccess(res.data));
    setTimeout(() => {
      window.location.replace(location);
    }, 500);
    toast.success("Logged in successfull", {
      position: "bottom-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  } catch (err) {
    toast.error("Email already exists", {
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
export const signin = async (dispatch, user, location) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/signin", user);
    dispatch(loginSuccess(res.data));
    setTimeout(() => {
      window.location.replace(location);
    }, 200);
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

export const updateProfile = async (dispatch, user) => {
  dispatch(updateProfileStart());
  try {
    const res = await userRequest.patch("/auth/update_profile", user);
    dispatch(updateProfileSuccess(res.data));
    toast.success("User profile updated in successfully", {
      position: "bottom-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  } catch {
    toast.error("user profile update is failed", {
      position: "bottom-right",
      autoClose: 2500,
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
  toast.success("User logout in successfully", {
    position: "bottom-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
  });
};

/*--------Tag--------*/
export const getTags = async (dispatch) => {
  dispatch(getTagstart());
  try {
    const res = await publicRequest.get("/tag");
    dispatch(getTagsuccess(res.data));
  } catch (err) {
    dispatch(getTagFailure());
  }
};

/*--------Category--------*/
export const getCategories = async (dispatch) => {
  dispatch(getCategorystart());
  try {
    const res = await publicRequest.get("/category");
    dispatch(getCategorysuccess(res.data));
  } catch (err) {
    dispatch(getCategoryFailure());
  }
};
/*--------Post--------*/
export const getPosts = async (dispatch) => {
  dispatch(getPoststart());
  try {
    const res = await publicRequest.get("/post");
    dispatch(getPostsuccess(res.data));
  } catch (err) {
    dispatch(getPostFailure());
  }
};

/*--------ReadingPost--------*/
export const getReadingList = async (dispatch) => {
  dispatch(getReadingPoststart());
  try {
    const res = await userRequest.get("/reading_list");
    dispatch(getReadingPostsuccess(res.data));
  } catch (err) {
    dispatch(getReadingPostFailure());
  }
};

export const addReadingPost = async (post, dispatch) => {
  dispatch(addReadingPoststart());
  try {
    const res = await userRequest.post("/reading_list/create/", post);
    dispatch(addReadingPostsuccess(res.data));
    toast.success("Post saved in successfully", {
      position: "bottom-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  } catch (err) {
    dispatch(addReadingPostFailure());
    toast.error("Login is required", {
      position: "bottom-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  }
};
export const deleteReadingPost = async (SavePostID, dispatch) => {
  dispatch(deleteReadingPoststart());
  try {
    const res = await userRequest.delete("/reading_list/delete/" + SavePostID);
    dispatch(deleteReadingPostsuccess(res.data));
    toast.success("Post removed in successfully", {
      position: "bottom-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  } catch (err) {
    dispatch(deleteReadingPostFailure());
  }
};
