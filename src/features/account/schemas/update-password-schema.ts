import { z } from "zod";

export const updatePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, { message: "Senha deve ter no mínimo 6 caracteres" })
      .max(20, { message: "Senha deve ter no máximo 20 caracteres" }),
    newPassword: z
      .string()
      .min(6, { message: "Senha deve ter no mínimo 6 caracteres" })
      .max(20, { message: "Senha deve ter no máximo 20 caracteres" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Senha deve ter no mínimo 6 caracteres" })
      .max(20, { message: "Senha deve ter no máximo 20 caracteres" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });
