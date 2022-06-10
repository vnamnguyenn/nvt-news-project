import { createSlice } from "@reduxjs/toolkit";

export const categoriesSlice = createSlice({
  name: "category",
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
        state.categories.findIndex(
          (item) => item.CategoryId === action.payload
        ),
        1
      );
    },
    getCategoryByIDFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteCategorystart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteCategorysuccess: (state, action) => {
      state.isFetching = false;
      state.categories.splice(
        state.categories.findIndex(
          (item) => item.CategoryId === action.payload
        ),
        1
      );
    },
    deleteCategoryFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateCategorystart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateCategorysuccess: (state, action) => {
      console.log(state.categories);
      state.isFetching = false;
      state.categories[
        state.categories.findIndex(
          (item) => item.CategoryId === action.payload.CategoryId
        )
      ] = action.payload.category;
    },
    updateCategoryFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //CREATE
    addCategorystart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addCategorysuccess: (state, action) => {
      state.isFetching = false;
      state.categories.push(action.payload);
    },
    addCategoryFailure: (state) => {
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
  deleteCategorystart,
  deleteCategorysuccess,
  deleteCategoryFailure,
  updateCategorystart,
  updateCategorysuccess,
  updateCategoryFailure,
  addCategorystart,
  addCategorysuccess,
  addCategoryFailure,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
