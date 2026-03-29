import type { registerSchema } from "@/features/auth/schemas/register-schema";
import { z } from "zod";

export type RegisterRequest = z.infer<typeof registerSchema>;
