import { axiosInstance } from "@/utils/api";

export const Create = async ({ data }) => {
  const { data: response } = await axiosInstance.post("/stories/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

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

export const Update = async ({ storyId }) => {
  const { data: response } = await axiosInstance.put(`/stories/${storyId}`);
  return response;
};

export const Delete = async () => {
  const { data: response } = await axiosInstance.put("/stories/");
  return response;
};
