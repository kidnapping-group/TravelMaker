import {
  getActivities,
  getActivitiesInfo,
  getActivitiesInfoRes,
  getActivitiesRes,
  getActivitiesReviews,
  getActivitiesReviewsRes,
  getActivitiesSchedule,
  getActivitiesScheduleRes,
  postActivities,
  postActivitiesRes,
  postActivitiesReservations,
  postActivitiesReservationsRes,
  postActivitiesImageRes,
} from "./API.type";
import handleAxiosError from "./ApiError";
import axiosInstance from "./axiosInstance";

const activitiesAPI = {
  // 체험 리스트 조회
  get: async (params: getActivities) => {
    try {
      const { data } = await axiosInstance.get<getActivitiesRes>("/activities", {
        params,
      });
      return data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  },
  // 체험 등록
  post: async (body: postActivities)=> {
    try {
      const { data } = await axiosInstance.post<postActivitiesRes> (`/activities`, body);
      return data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  },
  // 체험 상세 조회
  getInfo: async (params: getActivitiesInfo) => {
    try {
      const { data } = await axiosInstance.get<getActivitiesInfoRes>(`/activities/${params.id}`);
      return data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  },
  // 체험 예약 가능일 조회
  getSchedule: async (params: getActivitiesSchedule) => {
    try {
      const { data }= await axiosInstance.get<getActivitiesScheduleRes>(
        `/activities/${params.id}/available-schedule?year=${params.year}&month=${params.month}`,
      );
      return data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  },
  // 체험 리뷰 조회
  getReview: async (params: getActivitiesReviews) => {
    try {
      const page = params.page ? params.page : 1;
      const size = params.size ? params.size : 3;
      const { data } = await axiosInstance.get<getActivitiesReviewsRes>(
        `/activities/${params.id}/reviews?page=${page}&size=${size}`,
      );
      return data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  },
  // 체험 예약 신청
  postReservations: async (
    activityId: number,
    params: postActivitiesReservations,
  ) => {
    try {
      const { data } = await axiosInstance.post<postActivitiesReservationsRes>(`/activities/${activityId}/reservations`, {
        scheduleId: params.scheduleId,
        headCount: params.headCount,
      });
      return data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  },
  // 체험 이미지 url 생성
  postImage: async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const { data } = await axiosInstance.post<postActivitiesImageRes>(`/activities/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  },
};
export default activitiesAPI;
