import { UsersRes, patchUsers, postUsers, postUsersImageRes } from "./API.type";
import handleAxiosError from "./ApiError";
import axiosInstance from "./axiosInstance";

const userAPI = {
  // 회원가입
  postSingup: async (body: postUsers) => {
    try {
      const { data } = await axiosInstance.post<UsersRes>("/users", body);
      return data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  },
  // 내 정보 조회
  getUsers: async () => {
    try {
      const { data } = await axiosInstance.get<UsersRes>("/users/me");
      return data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  },
  // 내 정보 수정
  patchUsers: async (body: patchUsers) => {
    try {
      const { data } = await axiosInstance.patch<UsersRes>("/users/me", body);
      return data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  },
  // 프로필 이미지 url 생성
  postUsersImage: async (formData: FormData) => {
    try {
      const { data } = await axiosInstance.post<postUsersImageRes>("/users/me/image", formData, {
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
export default userAPI;
