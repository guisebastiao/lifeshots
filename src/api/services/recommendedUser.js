import { axiosInstance } from "@/utils/api";

export const GetAll = async ({ pageParam }) => {
  const { data: response } = await axiosInstance.get("/recommended-users/", {
    params: {
      offset: pageParam,
      limit: 10,
    },
  });
  return response;
};
