import { axiosInstance } from "@/utils/api";

export const login = async ({ data }) => {
  const { data: response } = await axiosInstance.post("/login/", data);
  return response;
};
