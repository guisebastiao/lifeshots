import axios, { AxiosError } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": "pt-BR",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const authStatusHeader = error.response?.headers["X-Auth-Status"];

    if (authStatusHeader === "TOKEN_EXPIRED") {
      try {
        authMutate("/auth/refresh");
      } catch (error) {
        authMutate("/auth/logout");
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    if (authStatusHeader === "TOKEN_INVALID") {
      authMutate("/auth/logout");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

const authMutate = async (path: string): Promise<void> => {
  await axios.post(
    import.meta.env.VITE_API_URL + path,
    {},
    {
      withCredentials: true,
    },
  );
};
