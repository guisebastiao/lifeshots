import { axiosInstance } from "@/utils/api";

export const activeAccount = async ({ data }) => {
  const { data: response } = await axiosInstance.post("/active-account/", data);
  return response;
};
