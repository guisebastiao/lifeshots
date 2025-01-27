import { z } from "zod";

import { mimetypes } from "@/utils/mimetypes";
import { filesize } from "@/utils/filesize";

export const editUserSchema = z.object({
  file: z
    .any()
    .optional()
    .refine((file) => !file || mimetypes.includes(file.type), {
      message: "Esse tipo de arquivo não é permitido",
    })
    .refine((file) => !file || file.size <= filesize, {
      message: "A imagem de perfil deve ter no máximo 5MB",
    }),
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
