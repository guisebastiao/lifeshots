import { axiosInstance } from "@/utils/api";

export const Delete = async ({ postImageId }) => {
  const { data: response } = await axiosInstance.delete(
    `/posts-images/${postImageId}`
  );
  return response;
};
