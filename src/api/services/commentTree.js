import { axiosInstance } from "@/utils/api";

export const Create = async ({ data }) => {
  const { data: response } = await axiosInstance.post("/comments-tree/", data);
  return response;
};

export const GetAll = async ({ commentId, pageParam }) => {
  const { data: response } = await axiosInstance.get(
    `/comments-tree/${commentId}`,
    {
      params: {
        offset: pageParam,
        limit: 5,
      },
    }
  );
  return response;
};

export const Update = async ({ commentTreeId }) => {
  const { data: response } = await axiosInstance.put(
    `/comments-tree/${commentTreeId}`
  );
  return response;
};

export const Delete = async () => {
  const { data: response } = await axiosInstance.put("/comments-tree/");
  return response;
};
