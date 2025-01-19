import { axiosInstance } from "@/utils/api";

export const Create = async ({ data }) => {
  const { data: response } = await axiosInstance.post("/likes-posts/", data);
  return response;
};

export const GetAll = async ({ postId, pageParam }) => {
  const { data: response } = await axiosInstance.get(`/likes-posts/${postId}`, {
    params: {
      offset: pageParam,
      limit: 10,
    },
  });
  return response;
};
