import { z } from "zod";

import { mimetypes } from "@/utils/mimetypes";
import { filesize } from "@/utils/filesize";

export const editPostSchema = z.object({
  content: z
    .string()
    .min(1, "A descrição não pode ficar vazia")
    .max(300, "A descrição tem que ter no máximo 300 caracteres"),
  files: z
    .any()
    .optional()
    .refine(
      (fileList) =>
        Array.from(fileList).every((file) => mimetypes.includes(file.type)),
      { message: "Existem tipos de arquivos não permitidos" }
    )
    .refine(
      (fileList) => Array.from(fileList).every((file) => file.size <= filesize),
      { message: "A imagem deve ter no máximo 5MB" }
    ),
});
