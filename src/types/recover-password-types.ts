import type { forgotPasswordSchema, recoverPasswordSchema } from "@/schemas/recover-password-schemas";
import { z } from "zod";

export type ForgotPasswordRequest = z.infer<typeof forgotPasswordSchema>;
export type RecoverPasswordRequest = z.infer<typeof recoverPasswordSchema>;
