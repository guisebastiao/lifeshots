import type { ProfilePictureResponse } from "@/features/profile-picture/types/profile-picture-types";
import { http } from "@/shared/api/http";

export const uploadProfilePicture = async ({ data }: { data: FormData }) => {
  const response = await http.post<ProfilePictureResponse>("/profile-picture", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (response.status === "error") {
    throw response.error;
  }

  return response.data;
};
