import {
  ReservationRes,
  getReservation,
  patchReservationRes,
  postReviews,
  postReviewsRes,
} from "./API.type";
import fetchInstance from "./fetchInstance";

const myReservationAPI = {
  // 내 예약 리스트 조회
  get: async (params?: getReservation) => {
    const data = await fetchInstance.get<ReservationRes>("/my-reservations", {
      params: {
        cursorId: params?.cursorId,
        size: params?.size ?? 10,
        status: params?.status,
      },
    });
    return data;
  },
  // 내 예약 수정(취소)
  patch: async (reservationId: number) => {
    const response = await fetchInstance.patch<patchReservationRes>(
      `/my-reservations/${reservationId}`,
      {
        status: "canceled",
      },
    );
    return response;
  },
  // 내 예약 리뷰 작성
  postReviews: async (reservationId: number, body: postReviews) => {
    const response = await fetchInstance.post<postReviewsRes>(
      `/my-reservations/${reservationId}/reviews`,
      body,
    );
    return response;
  },
};

export default myReservationAPI;
