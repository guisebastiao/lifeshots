import { axiosInstance } from "@/utils/api";

export const Create = async ({ data }) => {
  const { data: response } = await axiosInstance.post("/follows/", data);
  return response;
};

export const GetAll = async ({ userId, type, pageParam }) => {
  const { data: response } = await axiosInstance.get(`/follows/${userId}`, {
    params: {
      offset: pageParam,
      limit: 10,
      type,
    },
  });
  return response;
};
