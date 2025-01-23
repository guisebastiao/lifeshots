import { axiosInstance } from "@/utils/api";

export const GetAll = async ({ user, pageParam }) => {
  const { data: response } = await axiosInstance.get("/search/", {
    params: {
      user,
      pageParam,
    },
  });
  return response;
};
