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
  // 회원가입
  get: async (params: getReservation): Promise<ReservationRes | null> => {
    try {
      const cursorId = params.cursorId ? `&cursorId=${params.cursorId}` : "";
      const size = params.size ? `&size=${params.size}` : "&size=10";
      const status = params.status ? `&status=${params.status}` : "";
      const response = await axiosInstance.get(`/my-reservations?${cursorId}${size}${status}`);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  },
  patch: async (reservationId: ReservationId): Promise<patchReservationRes | null> => {
    try {
      const response = await axiosInstance.patch(`/my-reservations/${reservationId}`, {
        status: "canceled",
      });
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  },
  postReviews: async (
    reservationId: ReservationId,
    body: postReviews,
  ): Promise<postReviewsRes | null> => {
    try {
      const response = await axiosInstance.post(`/my-reservations/${reservationId}/reviews`, body);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  },
};

export default myReservationAPI;
