import { z } from "zod";

export const editUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Seu nome deve possuir no mínimo 3 caracteres" })
    .max(50, { message: "Seu nome deve possuir no máximo 50 caracteres" })
    .nonempty({ message: "O nome precisa ser preenchido" }),
  surname: z
    .string()
    .trim()
    .min(3, { message: "Seu sobrenome deve possuir no mínimo 3 caracteres" })
    .max(50, {
      message: "Seu sobrenome deve deve possuir máximo 50 caracteres",
    })
    .nonempty({ message: "O sobrenome precisa ser preenchido" }),
  bio: z.string().trim().max(150, {
    message: "A biografia deve possuir no máximo 150 caracteres",
  }),
});
