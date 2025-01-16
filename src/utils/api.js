import axios from "axios";

const auth = JSON.parse(localStorage.getItem("auth"));
const { token } = auth || {};

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.headers.authenticated === "false") {
      localStorage.removeItem("auth");
      location.reload();
    }

    return Promise.reject(error);
  }
);
