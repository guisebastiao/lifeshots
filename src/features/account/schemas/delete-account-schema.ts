import { z } from "zod";

export const deleteAccountSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Senha deve ter no mínimo 6 caracteres" })
    .max(20, { message: "Senha deve ter no máximo 20 caracteres" }),
});
