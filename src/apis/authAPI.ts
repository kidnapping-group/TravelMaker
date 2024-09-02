import Cookies from "js-cookie";

import socialLoginStore from "@/store/socialLoginStore";

import { Login, LoginRes } from "./API.type";
import axiosInstance from "./axiosInstance";
import userAPI from "./usersAPI";

const authAPI = {
  login: async (body: Login) => {
    const { data } = await axiosInstance.post<LoginRes>("/auth/login", body);
    const { accessToken, refreshToken } = data;
    Cookies.set("accessToken", accessToken, { secure: true, sameSite: "Strict" });
    Cookies.set("refreshToken", refreshToken, { secure: true, sameSite: "Strict" });
    const response = await userAPI.getUsers();
    socialLoginStore.getState().commonLogin({
      id: response.id,
      email: response.email,
      nickname: response.nickname,
      profileImageUrl: response.profileImageUrl,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
      social: false,
    });
  },
};

export default authAPI;
