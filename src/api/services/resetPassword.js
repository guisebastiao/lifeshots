import { axiosInstance } from "@/utils/api";

export const createResetPassword = async ({ data }) => {
  const { data: response } = await axiosInstance.post("/reset-password/", data);
  return response;
};

export const updatePassword = async ({ data, tokenId }) => {
  const { data: response } = await axiosInstance.put(
    `/reset-password/${tokenId}`,
    data
  );
  return response;
};
