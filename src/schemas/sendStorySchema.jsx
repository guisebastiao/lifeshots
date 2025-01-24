import { z } from "zod";
import { mimetypes } from "@/utils/mimetypes";
import { filesize } from "@/utils/filesize";

export const sendStorySchema = z.object({
  file: z
    .custom((value) => value instanceof FileList)
    .refine((fileList) => fileList.length === 1, {
      message: "É necessário enviar uma imagem",
    })
    .refine(
      (fileList) => Array.from(fileList).every((file) => file.size <= filesize),
      { message: "A imagem deve ter no máximo 5MB" }
    )
    .refine(
      (fileList) =>
        Array.from(fileList).every((file) => mimetypes.includes(file.type)),
      { message: "Esse tipo de arquivo não é permitido" }
    ),
  content: z
    .string()
    .min(1, "A legenda não pode ficar vazia")
    .max(150, "A legenda tem que ter no máximo 150 caracteres"),
});
