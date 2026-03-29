import { z } from "zod";

export const updateReplyCommentSchema = z.object({
  content: z
    .string()
    .min(1, { message: "Escreva seu comentário." })
    .max(300, { message: "O comentário deve ter no máximo 300 caracteres" }),
});
