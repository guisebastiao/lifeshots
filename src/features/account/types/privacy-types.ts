import type { privacySchema } from "@/features/account/schemas/privacy-schema";
import { z } from "zod";

export type PrivacyRequest = z.infer<typeof privacySchema>;
