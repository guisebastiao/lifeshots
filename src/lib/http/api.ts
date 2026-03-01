import { type ErrorResponse } from "@/types/api-types";
import { AXIOS_CODE } from "@/lib/http/axios-code";
import { authEmitter } from "@/lib/auth-events";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8080",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": "pt-BR",
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ErrorResponse>) => {
    if (!error.response) {
      if (error.code === AXIOS_CODE.ERR_CANCELED) {
        toast.error("A requisição foi cancelada.");
        return Promise.reject(null);
      }

      if (error.code === AXIOS_CODE.ECONNABORTED || error.code === AXIOS_CODE.ETIMEDOUT) {
        toast.error("A requisição excedeu o tempo limite.");
        return Promise.reject(null);
      }

      toast.error("Sem conexão com o servidor. Verifique sua internet.");
      return Promise.reject(null);
    }

    const code = error.response.data.error.code;
    const data = error.response.data;

    if (code === "TOKEN_EXPIRED") {
      authEmitter.emit("auth:refresh");
      return Promise.reject(null);
    }

    if (code === "SESSION_EXPIRED" || code === "TOKEN_INVALID" || code === "USER_NOT_FOUND") {
      authEmitter.emit("auth:logout");
      return Promise.reject(null);
    }

    if (code === "BAD_CREDENTIALS" || code === "VALIDATION_ERROR") {
      return Promise.reject(data);
    }

    toast.error("Aconteceu um erro inesperado, tente novamente mais tarde.");
    return Promise.reject(null);
  },
);
