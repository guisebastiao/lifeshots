import { axiosInstance } from "@/utils/api";

export const GetAll = async ({ pageParam }) => {
  const { data: response } = await axiosInstance.get("/explorer/", {
    params: {
      offset: pageParam,
      limit: 20,
    },
  });
  return response;
};
