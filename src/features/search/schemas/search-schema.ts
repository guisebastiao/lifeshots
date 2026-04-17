import { z } from "zod";

export const searchSchema = z.object({
  search: z.string().min(3, { message: "O campo da pesquisa tem que ter pelo menos 3 caracteres." }),
});
