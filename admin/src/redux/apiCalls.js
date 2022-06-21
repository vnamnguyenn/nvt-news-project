import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutSuccess,
} from "./userRedux";

import { downloadFile, publicRequest, userRequest } from "../requestMethods";
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

import {
  getBackupstart,
  getBackupsuccess,
  getBackupFailure,
  deleteBackupstart,
  deleteBackupsuccess,
  deleteBackupFailure,
  addbackupstart,
  addbackupsuccess,
  addbackupFailure,
} from "./backupRedux";
import {
  getCategorystart,
  getCategoryFailure,
  getCategorysuccess,
  addCategorystart,
  addCategoryFailure,
  addCategorysuccess,
  updateCategorystart,
  updateCategorysuccess,
  updateCategoryFailure,
  deleteCategorystart,
  deleteCategorysuccess,
  deleteCategoryFailure,
} from "./categoryRedux";
import fileDownload from "js-file-download";
/*--------User--------*/
export const signup = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/signup", user);
    dispatch(loginSuccess(res.data));
    setTimeout(() => {
      window.location.replace("/");
    }, 500);
    toast.success("Logged in successfull", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  } catch (err) {
    toast.error("Email already exists", {
      position: "bottom-right",
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
export const signin = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/signin", user);
    setTimeout(() => {
      window.location.replace("/");
    }, 500);
    toast.success("Logged in successfull", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
    dispatch(loginSuccess(res.data));
  } catch (err) {
    toast.error("Email and/or Password wrong", {
      position: "bottom-right",
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

export const logout = (dispatch) => {
  dispatch(logoutSuccess());
};
/*--------Backup--------*/
export const getbackup = async (dispatch) => {
  dispatch(getBackupstart());
  try {
    const res = await publicRequest.get("/backup");
    dispatch(getBackupsuccess(res.data));
  } catch (err) {
    dispatch(getBackupFailure());
  }
};

export const addBackup = async (dispatch) => {
  dispatch(addbackupstart());
  try {
    const res = await userRequest.post(`/backup/create`);
    dispatch(addbackupsuccess(res.data));
    toast.success("Backup created in successfully", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  } catch (err) {
    dispatch(addbackupFailure());
  }
};

export const downloadBackup = async (url, name) => {
  try {
    const res = await downloadFile.get(url);
    console.log(res.data);
    fileDownload(res.data, name);
  } catch (err) {}
};

export const restoreBackup = async (Path, backupName) => {
  try {
    await userRequest.get(`/backup/restore/${Path}`);
    toast.success(`Restore '${backupName}' in successfully`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  } catch (err) {
    toast.error(`Restore '${backupName}' is Failed`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  }
};

export const addBackupFromFile = async (Content, dispatch) => {
  dispatch(addbackupstart());
  try {
    const res = await userRequest.post(
      "/backup/add_backup_from_file/",
      Content
    );
    dispatch(addbackupsuccess(res.data));
    toast.success(`Data restored in successfully`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  } catch (err) {
    dispatch(addbackupFailure());
    toast.error(`Data restore is Failed, please check content file`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  }
};

export const restoreDefaultBackup = async () => {
  try {
    await publicRequest.get("/backup/import_data");
    toast.success(`Data restored in successfully`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  } catch (err) {
    toast.error(`Data restore is Failed, please check content file`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  }
};

export const createTable = async () => {
  try {
    await publicRequest.post("/database/create/");
    toast.success(`Table created in successfully`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  } catch (err) {
    toast.error(`Table create is Failed`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  }
};

export const deleteTable = async () => {
  try {
    await publicRequest.delete("/database/delete/");
    toast.success(`Delete Table in successfully`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  } catch (err) {
    toast.error(`Delete Table is Failed`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  }
};

export const deleteBackup = async (BackupIDs, dispatch) => {
  dispatch(deleteBackupstart());
  try {
    let index = BackupIDs.length - 1;
    while (index >= 0) {
      await userRequest.delete(`/backup/delete/${BackupIDs[index]}`);
      dispatch(deleteBackupsuccess(BackupIDs[index]));
      index -= 1;
    }
    toast.success(`Rows deleted in successfully`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  } catch (err) {
    dispatch(deleteBackupFailure());
  }
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

export const addTag = async (tag, dispatch) => {
  dispatch(addTagstart());
  try {
    const res = await userRequest.post(`/tag/create`, tag);
    dispatch(addTagsuccess(res.data));
    toast.success("Tag created in successfully", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  } catch (err) {
    dispatch(addTagFailure());
  }
};

export const updateTag = async (TagId, tagName, tag, dispatch) => {
  dispatch(updateTagstart());
  try {
    await userRequest.patch(`/tag/edit/${TagId}`, tag);
    dispatch(updateTagsuccess({ TagId, tag }));
    toast.success(`'${tagName}' updated in successfully`, {
      position: "bottom-right",
      autoClose: 3000,
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

export const deleteTag = async (tagIds, dispatch) => {
  dispatch(deleteTagstart());
  try {
    let index = tagIds.length - 1;
    while (index >= 0) {
      await userRequest.delete(`/tag/delete/${tagIds[index]}`);
      dispatch(deleteTagsuccess(tagIds[index]));
      index -= 1;
    }
    toast.success(`Rows deleted in successfully`, {
      position: "bottom-right",
      autoClose: 2000,
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

export const addCategory = async (category, dispatch) => {
  dispatch(addCategorystart());
  try {
    const res = await userRequest.post(`/category/create/`, category);
    dispatch(addCategorysuccess(res.data));
    toast.success("Category created in successfully", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  } catch (err) {
    dispatch(addCategoryFailure());
  }
};

export const updateCategory = async (
  CategoryId,
  CategoryName,
  category,
  dispatch
) => {
  dispatch(updateCategorystart());
  try {
    await userRequest.patch(`/category/edit/${CategoryId}`, category);
    dispatch(updateCategorysuccess({ CategoryId, category }));
    toast.success(`Update '${CategoryName}' in successfully`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  } catch (err) {
    dispatch(updateCategoryFailure());
  }
};

export const deleteCategory = async (CategoryIds, dispatch) => {
  dispatch(deleteCategorystart());
  try {
    let index = CategoryIds.length - 1;
    while (index >= 0) {
      await userRequest.delete(`/category/delete/${CategoryIds[index]}`);
      dispatch(deleteCategorysuccess(CategoryIds[index]));
      index -= 1;
    }
    toast.success(`Rows deleted in successfully`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  } catch (err) {
    dispatch(deleteCategoryFailure());
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

export const addPost = async (post, dispatch) => {
  dispatch(addPoststart());
  try {
    const res = await userRequest.post(`/post/create`, post);
    dispatch(addPostsuccess(res.data));
    toast.success("Post created in successfully", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  } catch (err) {
    dispatch(addPostFailure());
  }
};

export const updatePost = async (postID, postTitle, post, dispatch) => {
  dispatch(updatePoststart());
  try {
    await userRequest.patch(`/post/edit/${postID}`, post);
    dispatch(updatePostsuccess({ postID, post }));
    toast.success(`'${postTitle}' updated in successfully`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  } catch (err) {
    dispatch(updatePostFailure());
  }
};

export const deletePost = async (postIDs, dispatch) => {
  dispatch(deletePoststart());
  try {
    let index = postIDs.length - 1;
    while (index >= 0) {
      await userRequest.delete(`/post/delete/${postIDs[index]}`);
      dispatch(deletePostsuccess(postIDs[index]));
      index -= 1;
    }
    toast.success(`Rows deleted in successfully`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  } catch (err) {
    dispatch(deletePostFailure());
    toast.error(`Delete is Failed ${err}`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  }
};
