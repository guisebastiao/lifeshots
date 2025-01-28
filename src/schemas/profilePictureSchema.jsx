import { z } from "zod";

import { mimetypes } from "@/utils/mimetypes";
import { filesize } from "@/utils/filesize";

export const profilePictureSchema = z.object({
  file: z
    .any()
    .optional()
    .refine((file) => !file || mimetypes.includes(file.type), {
      message: "Esse tipo de arquivo não é permitido",
    })
    .refine((file) => !file || file.size <= filesize, {
      message: "A imagem de perfil deve ter no máximo 5MB",
    }),
});
