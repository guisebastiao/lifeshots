import { axiosInstance } from "@/utils/api";

export const activeLogin = async ({ data }) => {
  const { data: response } = await axiosInstance.post("/active-login/", data);
  return response;
};
