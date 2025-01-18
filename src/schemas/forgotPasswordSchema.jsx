import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, "O email é obrigatório").email("Email inválido"),
});
