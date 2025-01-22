import { axiosInstance } from "@/utils/api";

export const Get = async () => {
  const { data: response } = await axiosInstance.get("/stories/");
  return response;
};

export const GetAll = async () => {
  const { data: response } = await axiosInstance.get("/stories/all/", {
    params: {
      offset: 1,
      limit: 10,
    },
  });
  return response;
};
