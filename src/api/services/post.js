import { axiosInstance } from "@/utils/api";

export const Create = async ({ data }) => {
  const { data: response } = await axiosInstance.post("/posts/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const Get = async ({ postId }) => {
  const { data: response } = await axiosInstance.get(`/posts/${postId}`);
  return response;
};

export const GetAll = async ({ userId, pageParam }) => {
  const { data: response } = await axiosInstance.get(`/posts/all/${userId}`, {
    params: {
      offset: pageParam,
      limit: 12,
    },
  });
  return response;
};

export const Update = async ({ postId, data }) => {
  const { data: response } = await axiosInstance.put(`/posts/${postId}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const Delete = async ({ postId }) => {
  const { data: response } = await axiosInstance.delete(`/posts/${postId}`);
  return response;
};
