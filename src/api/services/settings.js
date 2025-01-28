import { axiosInstance } from "@/utils/api";

export const Get = async () => {
  const { data: response } = await axiosInstance.get("/settings/");
  return response;
};

export const Update = async ({ data }) => {
  const { data: response } = await axiosInstance.put("/settings/", data);
  return response;
};
