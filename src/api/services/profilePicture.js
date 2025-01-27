import { axiosInstance } from "@/utils/api";

export const Post = async ({ data }) => {
  const { data: response } = await axiosInstance.post(
    "/profile-picture/",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

export const Get = async () => {
  const { data: response } = await axiosInstance.get("/profile-picture/");
  return response;
};
