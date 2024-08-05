import { NotificationId, getNotifications, getNotificationsRes } from "./API.type";
import axiosInstance from "./axiosInstance";

const myNotificationsAPI = {
  //  내 알림 리스트 조회
  get: async (params?: getNotifications) => {
    const { data } = await axiosInstance.get<getNotificationsRes>("/my-notifications", {
      params: {
        cursorId: params?.cursorId,
        size: params?.size ?? 10,
      },
    });
    return data;
  },
  // 내 알림 삭제
  delete: async (notificationId: NotificationId) => {
    const { data } = await axiosInstance.delete(`/my-notifications/${notificationId}`);
    return data;
  },
};
export default myNotificationsAPI;
