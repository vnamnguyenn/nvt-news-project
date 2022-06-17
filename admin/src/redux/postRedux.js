import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getPoststart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getPostsuccess: (state, action) => {
      state.isFetching = false;
      state.posts = action.payload;
    },
    getPostFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //GET BY ID
    getPostByIDstart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getPostByIDsuccess: (state, action) => {
      state.isFetching = false;
      state.posts.splice(
        state.posts.findIndex((item) => item.PostID === action.payload),
        1
      );
    },
    getPostByIDFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deletePoststart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deletePostsuccess: (state, action) => {
      state.isFetching = false;
      state.posts.splice(
        state.posts.findIndex((item) => item.PostID === action.payload),
        1
      );
    },
    deletePostFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updatePoststart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updatePostsuccess: (state, action) => {
      state.isFetching = false;
      state.posts[
        state.posts.findIndex((item) => item.PostID === action.payload.postID)
      ] = action.payload.post;
    },
    updatePostFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //CREATE
    addPoststart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addPostsuccess: (state, action) => {
      state.isFetching = false;
      state.posts.push(action.payload);
    },
    addPostFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getPostByIDstart,
  getPostByIDsuccess,
  getPostByIDFailure,
  getPoststart,
  getPostsuccess,
  getPostFailure,
  deletePoststart,
  deletePostsuccess,
  deletePostFailure,
  updatePoststart,
  updatePostsuccess,
  updatePostFailure,
  addPoststart,
  addPostsuccess,
  addPostFailure,
} = postSlice.actions;

export default postSlice.reducer;
