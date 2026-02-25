import { generatePushSubscription } from "@/lib/push/generate-push-subscription";
import type { ApiError } from "@/types/api-types";
import { eventBus } from "@/lib/event-bus";
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
  async (error: AxiosError) => {
    const { error: apiError } = error.response?.data as ApiError;

    if (!apiError) {
      return Promise.reject(error);
    }

    if (apiError.code === "TOKEN_EXPIRED") {
      try {
        await authMutate("/auth/refresh");
        eventBus.emit("authenticate");
        generatePushSubscription();
      } catch (err) {
        await authMutate("/auth/logout");
        localStorage.setItem("is_authenticated", JSON.stringify(false));
        eventBus.emit("deauthenticate");
        return Promise.reject(err);
      }
    }

    if (apiError.code === "TOKEN_INVALID" || apiError.code === "SESSION_EXPIRED") {
      eventBus.emit("deauthenticate");
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
