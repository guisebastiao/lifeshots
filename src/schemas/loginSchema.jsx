import { z } from "zod";

const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,50}$/;

export const loginSchema = z.object({
  email: z.string().min(1, "O email é obrigatório").email("Email inválido"),
  password: z
    .string()
    .min(8, "A senha deve possuir no mínimo 8 caracteres")
    .max(50, "A senha deve possuir no máximo 50 caracteres")
    .regex(
      passwordRegex,
      "A senha deve possuir uma letra maiúscula, dois números e um caractere especial"
    ),
});
