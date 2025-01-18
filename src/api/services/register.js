import { axiosInstance } from "@/utils/api";

export const register = async ({ data }) => {
  const { data: response } = await axiosInstance.post("/register/", data);
  return response;
};
