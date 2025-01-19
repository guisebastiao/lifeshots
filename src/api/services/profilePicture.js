import { axiosInstance } from "@/utils/api";

export const Get = async () => {
  const { data: response } = await axiosInstance.get("/profile-picture/");
  return response;
};
