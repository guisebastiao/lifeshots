import { axiosInstance } from "@/utils/api";

export const Get = async () => {
  const { data: response } = await axiosInstance.get("/stories/");
  return response;
};

export const GetAll = async ({ pageParam }) => {
  const { data: response } = await axiosInstance.get("/stories/all/", {
    params: {
      offset: pageParam,
      limit: 10,
    },
  });
  return response;
};
