import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://192.168.18.78:3333",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    const { token } = auth || {};

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
