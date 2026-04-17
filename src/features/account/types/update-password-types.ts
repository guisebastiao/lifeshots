import type { updatePasswordSchema } from "@/features/account/schemas/update-password-schema";
import { z } from "zod";

export type UpdatePasswordRequest = z.infer<typeof updatePasswordSchema>;
