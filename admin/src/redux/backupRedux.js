import { createSlice } from "@reduxjs/toolkit";

export const backupSlice = createSlice({
  name: "backup",
  initialState: {
    backup: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getBackupstart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getBackupsuccess: (state, action) => {
      state.isFetching = false;
      state.backup = action.payload;
    },
    getBackupFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteBackupstart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteBackupsuccess: (state, action) => {
      state.isFetching = false;
      state.backup.splice(
        state.backup.findIndex((item) => item.BackupID === action.payload),
        1
      );
    },
    deleteBackupFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //CREATE
    addbackupstart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addbackupsuccess: (state, action) => {
      state.isFetching = false;
      state.backup.push(action.payload);
    },
    addbackupFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getBackupstart,
  getBackupsuccess,
  getBackupFailure,
  deleteBackupstart,
  deleteBackupsuccess,
  deleteBackupFailure,
  addbackupstart,
  addbackupsuccess,
  addbackupFailure,
} = backupSlice.actions;

export default backupSlice.reducer;
