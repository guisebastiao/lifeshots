import { http } from "@/shared/api/http";

export const deleteProfilePicture = async () => {
  const response = await http.delete("/profile-picture");

  if (response.status === "error") {
    throw response.error;
  }

  return response;
};
