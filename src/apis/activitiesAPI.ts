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
  posttActivitiesImageRes,
} from "./API.type";
import handleAxiosError from "./ApiError";
import axiosInstance from "./axiosInstance";

const activitiesAPI = {
  // 체험 리스트 조회
  get: async (params: getActivities): Promise<getActivitiesRes | null> => {
    try {
      const cursorId = params.cursorId ? `&cursorId=${params.cursorId}` : "";
      const category = params.category ? `&category=${params.category}` : "";
      const keyword = params.keyword ? `&keyword=${params.keyword}` : "";
      const sort = params.sort ? `&sort=${params.sort}` : "";
      const response = await axiosInstance.get(
        `/activities?method=${params.method}${cursorId}${category}${keyword}${sort}&page=${params.page}&size=${params.size}`,
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  },
  // 체험 등록
  post: async (body: postActivities): Promise<postActivitiesRes | null> => {
    try {
      const response = await axiosInstance.post(`/activities`, body);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  },
  // 체험 상세 조회
  getInfo: async (params: getActivitiesInfo): Promise<getActivitiesInfoRes | null> => {
    try {
      const response = await axiosInstance.get(`/activities/${params.id}`);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  },
  // 체험 예약 가능일 조회
  getSchedule: async (params: getActivitiesSchedule): Promise<getActivitiesScheduleRes | null> => {
    try {
      const response = await axiosInstance.get(
        `/activities/${params.id}/available-schedule?year=${params.year}&month=${params.month}`,
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  },
  // 체험 리뷰 조회
  getReview: async (params: getActivitiesReviews): Promise<getActivitiesReviewsRes | null> => {
    try {
      const page = params.page ? params.page : 1;
      const size = params.size ? params.size : 3;
      const response = await axiosInstance.get(
        `/activities/${params.id}/reviews?page=${page}&size=${size}`,
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  },
  // 체험 예약 신청
  postReservations: async (
    activityId: number,
    params: postActivitiesReservations,
  ): Promise<postActivitiesReservationsRes | null> => {
    try {
      const response = await axiosInstance.post(`/activities/${activityId}/reservations`, {
        scheduleId: params.scheduleId,
        headCount: params.headCount,
      });
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  },
  // 체험 이미지 url 생성
  postImage: async (file: File): Promise<posttActivitiesImageRes | null> => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = await axiosInstance.post(`/activities/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  },
};
export default activitiesAPI;
