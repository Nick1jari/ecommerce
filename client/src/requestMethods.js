import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OTg0OGFhYjFkZjQ5MTYyYjk3NmNhMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4OTI2NDcwNywiZXhwIjoxNjg5OTU1OTA3fQ.T4sy-6m4ESUExDagn94lh_FtLw-WutHWYv5L4orhFpQ";

// const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
// const currentUser = user && JSON.parse(user).currentUser;
// const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});