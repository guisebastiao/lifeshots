import { axiosInstance } from "@/utils/api";

export const Create = async ({ data }) => {
  const { data: response } = await axiosInstance.post("/comments/", data);
  return response;
};

export const GetAll = async ({ postId, pageParam }) => {
  const { data: response } = await axiosInstance.get(`/comments/${postId}`, {
    params: {
      offset: pageParam,
      limit: 10,
    },
  });
  return response;
};

export const Update = async ({ commentId }) => {
  const { data: response } = await axiosInstance.put(`/comments/${commentId}`);
  return response;
};

export const Delete = async ({ commentId }) => {
  const { data: response } = await axiosInstance.delete(
    `/comments/${commentId}`
  );
  return response;
};
