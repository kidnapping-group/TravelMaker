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
import handleAxiosError from "./ApiError";
import axiosInstance from "./axiosInstance";

const myActivitiesAPI = {
  //  내 체험 리스트 조회
  get: async (params: getActivities) => {
    try {
      const { data } = await axiosInstance.get<getActivitiesRes>("/my-activities", {
        params,
      });
      return data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  },
  // 내 체험 월별 예약 현황 조회
  getReservationMonth: async (params: getReservationMonth) => {
    try {
      const { data } = await axiosInstance.get<getReservationMonthRes[]>(
        `/my-activities${params.activityId}/reservation-dashboard`,
      );
      return data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  },
  // 내 체험 날짜별 예약 정보(신청,승인,거절)가 있는 스케쥴 조회
  getReservationDate: async (params: getReservationDate) => {
    try {
      const { data } = await axiosInstance.get<getReservationDateRes[]>(
        `/my-activities${params.activityId}/reserved-schedule`,
      );
      return data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  },
  // 내 체험 예약 시간대별 예약 내역 조회
  getReservation: async (params: getMyReservation) => {
    try {
      const { data } = await axiosInstance.get<getMyReservationRes>(
        `/my-activities${params.activityId}/reservations`,
      );
      return data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  },
  // 내 체험 예약 상태(승인, 거절) 업데이트
  patchReservation: async (params: patchMyReservation) => {
    try {
      const { data } = await axiosInstance.patch<patchMyReservationRes>(
        `/my-activities/${params.activityId}/reservations/${params.reservationId}`,
        { status: params.status },
      );
      return data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  },
  // 내 체험 삭제
  delete: async (activityId: number) => {
    try {
      const { data } = await axiosInstance.delete(`/my-activities/${activityId}`);
      return data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  },
  // 내 체험 수정
  patch: async (activityId: number, params: patchMyActivities) => {
    try {
      const { data } = await axiosInstance.patch<patchMyActivitiesRes>(
        `/my-activities/${activityId}`,
        params,
      );
      return data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  },
};
export default myActivitiesAPI;
