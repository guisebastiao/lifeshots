import { axiosInstance } from "@/utils/api";

export const Create = async ({ data }) => {
  const { data: response } = await axiosInstance.post("/blocks/", data);
  return response;
};

export const GetAll = async ({ pageParam }) => {
  const { data: response } = await axiosInstance.get("/blocks/", {
    params: {
      offset: pageParam,
      limit: 10,
    },
  });
  return response;
};
