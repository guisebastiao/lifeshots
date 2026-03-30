import type { uploadProfilePictureSchema } from "@/features/profile-picture/schemas/upload-profile-picture-schema";
import { z } from "zod";

export interface ProfilePictureResponse {
  id: string;
  fileKey: string;
  mimeType: string;
  url: string;
}

export type UploadProfilePictureRequest = z.infer<typeof uploadProfilePictureSchema>;
