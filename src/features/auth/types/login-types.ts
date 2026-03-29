import type { loginSchema } from "@/features/auth/schemas/login-schema";
import { z } from "zod";

export type LoginRequest = z.infer<typeof loginSchema>;
