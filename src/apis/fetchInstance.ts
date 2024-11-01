// src/lib/client.ts
import { createClient } from "@rivermountain/fetch-to-axios";
import Cookies from "js-cookie";

import { handleApiError } from "./ApiError";

const fetchInstance = createClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
  },
  credentials: "include",
});

// 요청 인터셉터 추가
fetchInstance.interceptors.request.push({
  onFulfilled: async config => {
    const excludedUrls = ["/auth/tokens"];

    if (excludedUrls.some(url => config.url?.includes(url))) {
      return config;
    }
    const accessToken = await Cookies.get("accessToken");
    const newConfig = { ...config };
    newConfig.headers = {
      ...newConfig.headers,
      Authorization: `Bearer ${accessToken}`,
    };

    return newConfig;
  },
  onRejected: error => Promise.reject(error),
});
fetchInstance.interceptors.response.push({
  onFulfilled: response => response,
  onRejected: async error => {
    const prevConfig = error.config;

    if (error.status === 401 && !prevConfig.retry) {
      prevConfig.retry = true;

      const currentRefreshToken = Cookies.get("refreshToken");
      if (!currentRefreshToken) {
        return Promise.reject(error);
      }

      try {
        const refreshClient = createClient({
          baseURL: process.env.NEXT_PUBLIC_BASE_URL,
          headers: {
            Authorization: `Bearer ${currentRefreshToken}`,
          },
        });

        const response = await refreshClient.post("auth/tokens");
        const { accessToken, refreshToken } = response;

        Cookies.set("refreshToken", refreshToken);
        Cookies.set("accessToken", accessToken);

        // 원래 요청 재시도 (HTTP 메서드에 따라 적절한 메서드 호출)
        const { method, url, body, ...restConfig } = prevConfig;
        prevConfig.headers = {
          ...prevConfig.headers,
          Authorization: `Bearer ${accessToken}`,
        };

        // HTTP 메서드에 따라 적절한 메서드 호출
        switch (method?.toUpperCase()) {
          case "GET":
            return await fetchInstance.get(url, restConfig);
          case "POST":
            return await fetchInstance.post(url, body, restConfig);
          case "PUT":
            return await fetchInstance.put(url, body, restConfig);
          case "PATCH":
            return await fetchInstance.patch(url, body, restConfig);
          case "DELETE":
            return await fetchInstance.delete(url, restConfig);
          default:
            return await fetchInstance.get(url, restConfig);
        }
      } catch (refreshError) {
        Cookies.remove("refreshToken");
        Cookies.remove("accessToken");
        Cookies.remove("social-login-store");
        window.location.href = "/signin?expiredRefreshToken=true";
        return Promise.reject(refreshError);
      }
    }

    const handledError = handleApiError(error);
    return Promise.reject(handledError);
  },
});

export default fetchInstance;
