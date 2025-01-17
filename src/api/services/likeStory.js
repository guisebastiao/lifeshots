import { axiosInstance } from "@/utils/api";

export const likeStory = async ({ data }) => {
  const { data: response } = await axiosInstance.post("/likes-stories/", data);
  return response;
};
