import { z } from "zod";

export const createReplyCommentSchema = z.object({
  content: z
    .string()
    .min(1, { message: "Escreva a resposta do comentário." })
    .max(300, { message: "A resposta do comentário deve ter no máximo 300 caracteres" }),
});
