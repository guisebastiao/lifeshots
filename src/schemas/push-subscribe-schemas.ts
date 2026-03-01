import { z } from "zod";

export const pushSubscriptionSchema = z.object({
  endpoint: z.string().min(1, "Endpoint é obrigatório"),
  keys: z.object({
    p256dh: z.string().min(1, "Chave p256dh é obrigatória"),
    auth: z.string().min(1, "Chave auth é obrigatória"),
  }),
  deviceId: z.string().min(1, "Device ID é obrigatório"),
  userAgent: z.string().min(1, "User agent é obrigatório"),
});
