import { axiosInstance } from "@/utils/api";

export const getAllNotifications = async ({ pageParam }) => {
  const { data: response } = await axiosInstance.get("/notifications/all/", {
    params: {
      offset: pageParam,
      limit: 20,
    },
  });
  return response;
};

export const getNotificationIsRead = async () => {
  const { data: response } = await axiosInstance.get("/notifications/");
  return response;
};

export const updateNotificationsToRead = async () => {
  const { data: response } = await axiosInstance.put("/notifications/");
  return response;
};

export const deleteAllNotifications = async () => {
  const { data: response } = await axiosInstance.delete("/notifications/");
  return response;
};
