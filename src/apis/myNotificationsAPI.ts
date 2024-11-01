import { getNotifications, getNotificationsRes } from "./API.type";
import fetchInstance from "./fetchInstance";

const myNotificationsAPI = {
  //  내 알림 리스트 조회
  get: async (params?: getNotifications) => {
    const data = await fetchInstance.get<getNotificationsRes>("/my-notifications", {
      params: {
        cursorId: params?.cursorId,
        size: params?.size ?? 10,
      },
    });
    return data;
  },
  // 내 알림 삭제
  delete: async (notificationId: number) => {
    const data = await fetchInstance.delete(`/my-notifications/${notificationId}`);
    return data;
  },
};
export default myNotificationsAPI;
