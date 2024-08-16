import {
  getActivities,
  getActivitiesRes,
  getMyReservation,
  getMyReservationRes,
  getReservationDate,
  getReservationDateRes,
  getReservationMonth,
  getReservationMonthRes,
  patchMyActivities,
  patchMyActivitiesRes,
  patchMyReservation,
  patchMyReservationRes,
} from "./API.type";
import axiosInstance from "./axiosInstance";

const myActivitiesAPI = {
  //  내 체험 리스트 조회
  get: async (params: getActivities = { size: 20 }) => {
    const { data } = await axiosInstance.get<getActivitiesRes>("/my-activities", {
      params,
    });
    return data;
  },
  // 내 체험 월별 예약 현황 조회
  getReservationMonth: async (params: getReservationMonth) => {
    const { data } = await axiosInstance.get<getReservationMonthRes[]>(
      `/my-activities/${params.activityId}/reservation-dashboard?year=${params.year}&month=${params.month}`,
    );
    return data;
  },
  // 내 체험 날짜별 예약 정보(신청,승인,거절)가 있는 스케쥴 조회
  getReservationDate: async (params: getReservationDate) => {
    const { data } = await axiosInstance.get<getReservationDateRes[]>(
      `/my-activities/${params.activityId}/reserved-schedule?date=${params.date}`,
    );
    return data;
  },
  // 내 체험 예약 시간대별 예약 내역 조회
  getReservation: async (params: getMyReservation) => {
    const size = params.size ? params.size : 3;
    const cursorId = params.cursorId ? `&=cursorId=${params.cursorId}` : "";
    const { data } = await axiosInstance.get<getMyReservationRes>(
      `/my-activities/${params.activityId}/reservations?size=${size}${cursorId}&scheduleId=${params.scheduleId}&status=${params.status}`,
    );
    return data;
  },
  // 내 체험 예약 상태(승인, 거절) 업데이트
  patchReservation: async (params: patchMyReservation) => {
    const { data } = await axiosInstance.patch<patchMyReservationRes>(
      `/my-activities/${params.activityId}/reservations/${params.reservationId}`,
      { status: params.status },
    );
    return data;
  },
  // 내 체험 삭제
  delete: async (activityId: number) => {
    const { data } = await axiosInstance.delete(`/my-activities/${activityId}`);
    return data;
  },
  // 내 체험 수정
  patch: async (activityId: number, params: patchMyActivities) => {
    const { data } = await axiosInstance.patch<patchMyActivitiesRes>(
      `/my-activities/${activityId}`,
      params,
    );
    return data;
  },
};
export default myActivitiesAPI;
