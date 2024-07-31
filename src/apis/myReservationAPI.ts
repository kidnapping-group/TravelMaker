import {
  ReservationId,
  ReservationRes,
  getReservation,
  patchReservationRes,
  postReviews,
  postReviewsRes,
} from "./API.type";
import handleAxiosError from "./ApiError";
import axiosInstance from "./axiosInstance";

const myReservationAPI = {
  // 내 예약 리스트 조회
  get: async (params?: getReservation) => {
    try {
      const { data } = await axiosInstance.get<ReservationRes>("/my-reservations", {
        params: {
          cursorId: params?.cursorId,
          size: params?.size ?? 10,
          status: params?.status,
        },
      });
      return data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  },
  // 내 예약 수정(취소)
  patch: async (reservationId: number) => {
    try {
      const response = await axiosInstance.patch<patchReservationRes>(
        `/my-reservations/${reservationId}`,
        {
          status: "canceled",
        },
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  },
  // 내 예약 리뷰 작성
  postReviews: async (reservationId: ReservationId, body: postReviews) => {
    try {
      const response = await axiosInstance.post<postReviewsRes>(
        `/my-reservations/${reservationId}/reviews`,
        body,
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  },
};

export default myReservationAPI;
