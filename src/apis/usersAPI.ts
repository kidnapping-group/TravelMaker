import { User, patchUsers, postUsers, postUsersImageRes } from "./API.type";
import axiosInstance from "./axiosInstance";

const userAPI = {
  // 회원가입
  postSignup: async (body: postUsers) => {
    const { data } = await axiosInstance.post<User>("/users", body);
    return data;
  },
  // 내 정보 조회
  getUsers: async () => {
    const { data } = await axiosInstance.get<User>("/users/me");
    return data;
  },
  // 내 정보 수정
  patchUsers: async (body: patchUsers) => {
    const { data } = await axiosInstance.patch<User>("/users/me", body);
    return data;
  },
  // 프로필 이미지 url 생성
  postUsersImage: async (formData: FormData) => {
    const { data } = await axiosInstance.post<postUsersImageRes>("/users/me/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  },
};
export default userAPI;
