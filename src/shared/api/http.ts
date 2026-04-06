import type { DefaultResponse, ErrorPayload } from "@/shared/types/api-types";
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { api } from "@/shared/api/axios";

export const http = {
  get: <T>(url: string, config?: AxiosRequestConfig) => request<T>(api.get(url, config)),
  post: <T, B = unknown>(url: string, body?: B, config?: AxiosRequestConfig) => request<T>(api.post(url, body, config)),
  put: <T, B = unknown>(url: string, body?: B, config?: AxiosRequestConfig) => request<T>(api.put(url, body, config)),
  patch: <T, B = unknown>(url: string, body?: B, config?: AxiosRequestConfig) =>
    request<T>(api.patch(url, body, config)),
  delete: <T>(url: string, config?: AxiosRequestConfig) => request<T>(api.delete(url, config)),
};

async function request<T>(promise: Promise<AxiosResponse<DefaultResponse<T>>>): Promise<DefaultResponse<T>> {
  try {
    const { data } = await promise;

    if (data.status === "error") {
      throw normalizeError(data.error);
    }

    return data;
  } catch (err) {
    const axiosError = err as AxiosError<DefaultResponse<unknown>>;

    if (axiosError.response?.data?.status === "error") {
      throw normalizeError(axiosError.response.data.error);
    }

    throw normalizeError();
  }
}

function normalizeError(error?: Partial<ErrorPayload>): ErrorPayload {
  const code = error?.code ?? "INTERNAL_SERVER_ERROR";
  const message = error?.message ?? "Ocorreu um erro inesperado, tente novamente mais tarde.";

  if (code === "VALIDATION_ERROR") {
    return {
      code,
      message,
      details: (error?.details as any[]) ?? [],
    };
  }

  return {
    code,
    message,
    details: null,
  };
}
