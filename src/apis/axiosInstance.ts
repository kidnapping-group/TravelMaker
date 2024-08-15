import axios, { InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

import handleAxiosError from "./ApiError";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const excludedUrls = ["/auth/tokens"];
    if (excludedUrls.some(url => config.url?.includes(url))) {
      return config;
    }
    const accessToken = await Cookies.get("accessToken");
    const newConfig = { ...config };
    newConfig.headers.Authorization = `Bearer ${accessToken}`;
    return newConfig;
  },
  error => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const prevRequest = error.config;
    if (error.response.status === 401 && !prevRequest.retry) {
      prevRequest.retry = true;

      const currentRefreshToken = Cookies.get("refreshToken");
      if (!currentRefreshToken) {
        return Promise.reject(error);
      }
      try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/tokens`, null, {
          headers: {
            Authorization: `Bearer ${currentRefreshToken}`,
          },
        });
        const { accessToken, refreshToken } = data;
        Cookies.set("refreshToken", refreshToken);
        Cookies.set("accessToken", accessToken);
        prevRequest.headers.Authorization = `Bearer ${accessToken}`;
        const response = await axiosInstance(prevRequest);
        return response;
      } catch (refreshError) {
        Cookies.remove("refreshToken");
        Cookies.remove("accessToken");
        Cookies.remove("social-login-store");
        window.location.href = "/signin?expiredRefreshToken=true";
      }
    }
    handleAxiosError(error);
    return Promise.reject(error);
  },
);
export default axiosInstance;
