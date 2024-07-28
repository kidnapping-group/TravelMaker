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
    if (config.headers["exclude-access-token"]) {
      const newConfig = { ...config };
      newConfig.headers.delete("exclude-access-token");
      return newConfig;
    }
    const accessToken = await localStorage.getItem('accessToken');
    const newConfig = { ...config };
    newConfig.headers.Authorization = `Bearer ${accessToken}`;
    return newConfig;
  },
  error => Promise.reject(error),
);

export default axiosInstance;
