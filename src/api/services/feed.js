import { axiosInstance } from "@/utils/api";

export const GetAll = async ({ pageParam }) => {
  const { data: response } = await axiosInstance.get("/feed/", {
    params: {
      offset: pageParam,
      limit: 2,
    },
  });
  return response;
};
