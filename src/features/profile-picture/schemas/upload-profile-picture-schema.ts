import { ACCEPTED_MIMETYPES } from "@/shared/utils/accept-mimetypes";
import { ACCEPT_FILESIZE } from "@/shared/utils/accept-filesize";
import { z } from "zod";

export const uploadProfilePictureSchema = z.object({
  file: z
    .instanceof(File, { message: "Envie sua foto de perfil." })
    .nullable()
    .refine((file) => !file || ACCEPTED_MIMETYPES.includes(file.type), {
      message: "Sua foto de perfil está no formato inválido.",
    })
    .refine((file) => !file || file.size <= ACCEPT_FILESIZE, {
      message: "Sua foto de perfil deve ter no máximo 5MB.",
    }),
});
