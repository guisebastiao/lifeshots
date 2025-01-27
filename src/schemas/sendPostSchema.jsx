import { z } from "zod";

import { mimetypes } from "@/utils/mimetypes";
import { filesize } from "@/utils/filesize";

export const sendPostSchema = z.object({
  files: z
    .instanceof(FileList)
    .refine((fileList) => fileList.length > 0, {
      message: "É necessário enviar pelo menos uma imagem",
    })
    .refine(
      (fileList) => Array.from(fileList).every((file) => file.size <= filesize),
      { message: "A imagem deve ter no máximo 5MB" }
    )
    .refine(
      (fileList) =>
        Array.from(fileList).every((file) => mimetypes.includes(file.type)),
      { message: "Existem tipos de arquivos não permitidos" }
    ),
  content: z
    .string()
    .min(1, "A descrição não pode ficar vazia")
    .max(300, "A descrição tem que ter no máximo 300 caracteres"),
});
