import { NotificationId, getNotifications, getNotificationsRes } from "./API.type";
import handleAxiosError from "./ApiError";
import axiosInstance from "./axiosInstance";

const myNotificationsAPI = {
  //  내 알림 리스트 조회
  get: async (params: getNotifications): Promise<getNotificationsRes | null> => {
    try {
      const cursorId = params.cursorId ? `&cursorId=${params.cursorId}` : "";
      const size = params.size ? `&size=${params.size}` : "&size=10";
      const response = await axiosInstance.get(`/my-notifications?${cursorId}${size}`);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  },
  // 내 알림 삭제
  delete: async (notificationId: NotificationId) => {
    try {
      const response = await axiosInstance.delete(`/my-notifications/${notificationId}`);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  },
};
export default myNotificationsAPI;
