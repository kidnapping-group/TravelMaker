import { patchUsers, postUsers, postUsersImageRes, UsersRes } from "./API.type";
import handleAxiosError from "./ApiError";
import axiosInstance from "./axiosInstance";

const userAPI = {
  // 회원가입
  postSingup: async (body: postUsers): Promise<UsersRes | null> => {
    try {
      const response = await axiosInstance.post("/users", body);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  },
  // 내 정보 조회
  getUsers: async (): Promise<UsersRes | null> => {
    try {
      const response = await axiosInstance.get("/users/me");
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  },
  // 내 정보 수정
  patchUsers: async (body: patchUsers): Promise<UsersRes | null> => {
    try {
      const response = await axiosInstance.patch("/users/me", body);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  },
  // 프로필 이미지 url 생성
  postUsersImage: async (formData: FormData): Promise<postUsersImageRes | null> => {
    try {
      const response = await axiosInstance.post("/users/me/image", formData, {
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
export default userAPI;
