import Cookies from "js-cookie";

import { Login, LoginRes } from "./API.type";
import axiosInstance from "./axiosInstance";

const authAPI = {
  login: async (body: Login) => {
    const { data } = await axiosInstance.post<LoginRes>("/auth/login", body);
    const { accessToken, refreshToken } = data;
    Cookies.set("accessToken", accessToken);
    Cookies.set("refreshToken", refreshToken);
    return data;
  },
};

export default authAPI;
