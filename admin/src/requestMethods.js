import axios from "axios";

const BASE_URL = "http://localhost:9000/api";
const BASE_URL_DOWNLOAD = "http://localhost:9000/backup/";
const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const downloadFile = axios.create({
  baseURL: BASE_URL_DOWNLOAD,
  responseType: "blob",
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});

export const baseImageUrl = "http://localhost:9000/images/";
export const basebackupUrl = "http://localhost:9000/backup/";
