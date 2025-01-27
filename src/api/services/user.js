import { axiosInstance } from "@/utils/api";

export const Get = async ({ userId }) => {
  const { data: response } = await axiosInstance.get(`/users/${userId}`);
  return response;
};

export const Update = async ({ data }) => {
  const { data: response } = await axiosInstance.put("/users/", data);
  return response;
};

export const Delete = async () => {
  const { data: response } = await axiosInstance.delete("/users/");
  return response;
};
