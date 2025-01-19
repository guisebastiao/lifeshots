import { axiosInstance } from "@/utils/api";

export const Create = async ({ data }) => {
  const { data: response } = await axiosInstance.post("/reset-password/", data);
  return response;
};

export const Update = async ({ data, tokenId }) => {
  const { data: response } = await axiosInstance.put(
    `/reset-password/${tokenId}`,
    data
  );
  return response;
};
