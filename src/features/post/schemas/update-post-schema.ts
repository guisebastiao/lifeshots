import { ACCEPTED_MIMETYPES } from "@/shared/utils/accept-mimetypes";
import { ACCEPT_FILESIZE } from "@/shared/utils/accept-filesize";
import { z } from "zod";

const MAX_FILES = 10;

const isValidFile = (file: File | null | undefined) => {
  return file && file.size > 0;
};

export const updatePostSchema = z.object({
  content: z.string().max(300, "A descrição tem que ter no máximo de 300 caracteres.").optional(),
  newFiles: z
    .array(z.instanceof(File), {
      error: "Por favor, envie imagens apenas para sua publicação.",
    })
    .refine(
      (files) => {
        const validFiles = files.filter(isValidFile);
        return validFiles.length <= MAX_FILES;
      },
      {
        message: `É permitido até ${MAX_FILES} de imagens por publicação.`,
      },
    )
    .refine(
      (files) => {
        return files.every((file) => {
          if (!isValidFile(file)) return true;
          return file.size <= ACCEPT_FILESIZE;
        });
      },
      {
        message: "A imagem excede os 5MB permitidos.",
      },
    )
    .refine(
      (files) => {
        return files.every((file) => {
          if (!isValidFile(file)) return true;
          return ACCEPTED_MIMETYPES.includes(file.type);
        });
      },
      {
        message: "A imagem está em um formato inválido.",
      },
    ),
  removeFiles: z.array(z.string()),
});
