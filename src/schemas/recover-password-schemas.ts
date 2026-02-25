import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email é obrigatório" })
    .email({ message: "Email inválido" })
    .max(250, { message: "Email deve ter no máximo 250 caracteres" }),
});

export const recoverPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, { message: "Senha deve ter no mínimo 6 caracteres" })
      .max(20, { message: "Senha deve ter no máximo 20 caracteres" })
      .regex(/.*[A-Z].*/, {
        message: "Senha deve conter pelo menos uma letra maiúscula",
      })
      .regex(/.*[@#$%&*!].*/, {
        message: "Senha deve conter pelo menos um caractere especial",
      })
      .regex(/(?:.*\d){2,}.*/, {
        message: "Senha deve conter pelo menos dois números",
      }),
    confirmPassword: z
      .string()
      .min(6, { message: "Senha deve ter no mínimo 6 caracteres" })
      .max(20, { message: "Senha deve ter no máximo 20 caracteres" })
      .regex(/.*[A-Z].*/, {
        message: "Senha deve conter pelo menos uma letra maiúscula",
      })
      .regex(/.*[@#$%&*!].*/, {
        message: "Senha deve conter pelo menos um caractere especial",
      })
      .regex(/(?:.*\d){2,}.*/, {
        message: "Senha deve conter pelo menos dois números",
      }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });
