import { axiosInstance } from "@/utils/api";

export const profilePicture = async () => {
  const { data: response } = await axiosInstance.get("/profile-picture/");
  return response;
};
