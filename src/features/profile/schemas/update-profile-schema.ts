import { z } from "zod";

export const updateProfileSchema = z.object({
  fullName: z
    .string()
    .nonempty({ message: "Informe seu nome completo." })
    .min(3, { message: "Seu nome tem que ser maior que 3 caracteres." })
    .max(250, { message: "Seu nome tem que ser menor que 250 caracteres." }),
  bio: z.string().max(300, { message: "Sua biografia tem que ser menor que 300 caracteres" }),
});
