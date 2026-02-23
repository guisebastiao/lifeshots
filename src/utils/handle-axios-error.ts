import type { DefaultResponse } from "@/types/api-types";
import { AxiosError } from "axios";

export function handleAxiosError(error: unknown): never {
  if (error instanceof AxiosError) {
    if (!error.response) {
      throw new Error("Não foi possível conectar ao servidor. Tente novamente mais tarde.");
    }

    const data = error.response.data as DefaultResponse<unknown>;

    if (data.status === "error") {
      throw new Error(data.error.message);
    }

    throw new Error("Ocorreu um erro inesperado.");
  }

  throw new Error("Algo deu errado, tente novamente mais tarde.");
}
