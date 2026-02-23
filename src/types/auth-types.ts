import type { loginSchema, registerSchema } from "@/schemas/auth-schemas";
import type { RoleResponse } from "@/types/role-response";
import { z } from "zod";

export interface AuthResponse {
  id: string;
  handle: string;
  roles: RoleResponse[];
}

export type LoginRequest = z.infer<typeof loginSchema>;
export type RegisterRequest = z.infer<typeof registerSchema>;
