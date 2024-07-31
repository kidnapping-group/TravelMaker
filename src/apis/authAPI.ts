import useAuthStore from "@/store/useAuthStore";

import { Login, LoginRes } from "./API.type";
import handleAxiosError from "./ApiError";
import axiosInstance from "./axiosInstance";

const authAPI = {
  login: async (body: Login) => {
    try {
      const { data } = await axiosInstance.post<LoginRes>("/auth/login", body);
      const { accessToken, refreshToken } = data;
      localStorage.setItem("refreshToken", refreshToken);
      const { login } = useAuthStore.getState();
      login(accessToken, refreshToken);
      return data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  },
};

export default authAPI;
