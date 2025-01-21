import { z } from "zod";

export const commentTreeSchema = z.object({
  content: z
    .string("Valor inválido")
    .min(1, "O comentário precisa ser preenchido")
    .max(300, "O comentário pode ser preenchido com 300 caracteres apenas"),
});
