import { axiosInstance } from "@/utils/api";

export const Get = async () => {
  const { data: response } = await axiosInstance.get("/notifications/");
  return response;
};

export const GetAll = async ({ pageParam }) => {
  const { data: response } = await axiosInstance.get("/notifications/all/", {
    params: {
      offset: pageParam,
      limit: 20,
    },
  });
  return response;
};

export const Update = async () => {
  const { data: response } = await axiosInstance.put("/notifications/");
  return response;
};

export const Delete = async () => {
  const { data: response } = await axiosInstance.delete("/notifications/");
  return response;
};
