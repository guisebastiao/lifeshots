import { z } from "zod";

const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,50}$/;

export const registerSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, {
        message: "Seu nome de usuário deve ter no mínimo 3 caracteres",
      })
      .max(50, {
        message: "Seu nome de usuário deve ter no máximo 50 caracteres",
      })
      .nonempty({ message: "O nome de usuário precisa ser preenchido" })
      .refine((value) => !/\s/.test(value), {
        message: "O nome de usuário não pode possuir espaços",
      }),

    name: z
      .string()
      .trim()
      .min(3, { message: "Seu nome deve ter no mínimo 3 caracteres" })
      .max(50, { message: "Seu nome deve ter no máximo 50 caracteres" })
      .nonempty({ message: "O nome precisa ser preenchido" }),

    surname: z
      .string()
      .trim()
      .min(3, { message: "Seu sobrenome deve ter no mínimo 3 caracteres" })
      .max(50, { message: "Seu sobrenome deve ter no máximo 50 caracteres" })
      .nonempty({ message: "O sobrenome precisa ser preenchido" }),
    email: z.string().email("Email inválido").min(1, "O email é obrigatório"),
    password: z
      .string()
      .min(8, "A senha tem que ter no mínimo 8 caracteres")
      .max(50, "A senha tem que ter no máximo 50 caracteres")
      .regex(
        passwordRegex,
        "A senha deve possuir uma letra maiúscula, dois números e um caractere especial"
      ),
    passwordConfirm: z.string().nonempty("Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "As senhas não correspondem",
    path: ["passwordConfirm"],
  });
