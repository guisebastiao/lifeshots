import { z } from "zod";

export const registerSchema = z
  .object({
    handle: z
      .string()
      .min(1, { message: "Usuário é obrigatório" })
      .min(3, { message: "Usuário deve ter no mínimo 3 caracteres" })
      .max(20, { message: "Usuário deve ter no máximo 20 caracteres" })
      .regex(/^[A-Za-z][A-Za-z0-9._]*$/, {
        message: "Usuário deve começar com letra e conter apenas letras, números, ponto ou underscore",
      }),
    fullName: z
      .string()
      .min(1, { message: "Nome completo é obrigatório" })
      .min(3, { message: "Nome deve ter no mínimo 3 caracteres" })
      .max(250, { message: "Nome deve ter no máximo 250 caracteres" }),
    email: z
      .string()
      .min(1, { message: "Email é obrigatório" })
      .email({ message: "Email inválido" })
      .max(250, { message: "Email deve ter no máximo 250 caracteres" }),
    password: z
      .string()
      .min(6, { message: "Senha deve ter no mínimo 6 caracteres" })
      .max(20, { message: "Senha deve ter no máximo 20 caracteres" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirmação deve ter no mínimo 6 caracteres" })
      .max(20, { message: "Confirmação deve ter no máximo 20 caracteres" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });
