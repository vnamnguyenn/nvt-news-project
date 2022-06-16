import { createSlice } from "@reduxjs/toolkit";

export const tagSlice = createSlice({
  name: "tag",
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
        1
      );
    },
    getTagByIDFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteTagstart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteTagsuccess: (state, action) => {
      state.isFetching = false;
      state.tags.splice(
        state.tags.findIndex((item) => item.TagId === action.payload),
        1
      );

      // for (let i = action.payload.length - 1; i >= 0; i--) {
      //   state.tags.splice(
      //     state.tags.findIndex((item) => item.TagId === action.payload[i]),
      //     1
      //   );
      // }
    },
    deleteTagFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateTagstart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateTagsuccess: (state, action) => {
      console.log(state.tags);
      state.isFetching = false;
      state.tags[
        state.tags.findIndex((item) => item.TagId === action.payload.TagId)
      ] = action.payload.tag;
    },
    updateTagFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //CREATE
    addTagstart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addTagsuccess: (state, action) => {
      state.isFetching = false;
      state.tags.push(action.payload);
    },
    addTagFailure: (state) => {
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
  deleteTagstart,
  deleteTagsuccess,
  deleteTagFailure,
  updateTagstart,
  updateTagsuccess,
  updateTagFailure,
  addTagstart,
  addTagsuccess,
  addTagFailure,
} = tagSlice.actions;

export default tagSlice.reducer;
