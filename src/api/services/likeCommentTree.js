import { axiosInstance } from "@/utils/api";

export const Create = async ({ data }) => {
  const { data: response } = await axiosInstance.post(
    "/likes-comments-tree/",
    data
  );
  return response;
};
