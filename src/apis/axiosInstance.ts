import useAuthStore from "@/store/useAuthStore";
import axios, { InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "https://sp-globalnomad-api.vercel.app/06-02/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = await localStorage.getItem("accessToken");
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

      let currentRefreshToken = localStorage.getItem("refreshToken");
      if (!currentRefreshToken) {
        const { logout } = useAuthStore.getState();
        logout();
        return Promise.reject(error);
      }

      try {
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${currentRefreshToken}`;
        const { data } = await axiosInstance.post("/auth/tokens");
        const { accessToken, refreshToken } = data;

        localStorage.setItem("refreshToken", refreshToken);
        const { login } = useAuthStore.getState();
        login(accessToken, refreshToken);

        localStorage.setItem("accessToken", accessToken);
        prevRequest.headers.Authorization = `Bearer ${accessToken}`;
        return await axiosInstance(prevRequest);
      } catch (refreshError) {
        const { logout } = useAuthStore.getState();
        logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
