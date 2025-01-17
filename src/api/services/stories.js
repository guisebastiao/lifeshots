import { axiosInstance } from "@/utils/api";

export const getUserStory = async () => {
  const { data: response } = await axiosInstance.get("/stories/");
  return response;
};

export const getAllStory = async ({ offset, limit }) => {
  const { data: response } = await axiosInstance.get("/stories/list/", {
    params: {
      offset,
      limit,
    },
  });
  return response;
};
