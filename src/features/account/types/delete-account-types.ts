import type { deleteAccountSchema } from "@/features/account/schemas/delete-account-schema";
import { z } from "zod";

export type DeleteAccountRequest = z.infer<typeof deleteAccountSchema>;
