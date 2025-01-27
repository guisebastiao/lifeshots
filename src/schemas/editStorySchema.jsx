import { z } from "zod";

export const editStorySchema = z.object({
  content: z
    .string()
    .min(1, "A descrição não pode ficar vazia")
    .max(150, "A descrição tem que ter no máximo 150 caracteres"),
});
