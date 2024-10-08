import Cookies from "js-cookie";

import socialLoginStore from "@/store/socialLoginStore";

import { OauthPostRes, OauthSignRes } from "./API.type";
import axiosInstance from "./axiosInstance";

const OauthAPI = {
  // 간편로그인 앱 등록 및 수정
  post: async (body: { appKey: string; provider: "google" | "kakao" }) => {
    const { data } = await axiosInstance.post<OauthPostRes>(`/oauth/apps`, body);
    return data;
  },
  // 간편 회원가입
  postSignup: async (
    provider: "google" | "kakao",
    body: { nickname: string; redirectUri: string; token: string },
  ) => {
    const { data } = await axiosInstance.post<OauthSignRes>(`/oauth/sign-up/${provider}`, body);
    const { accessToken, refreshToken } = data;
    Cookies.set("accessToken", accessToken, { secure: true, sameSite: "Strict" });
    Cookies.set("refreshToken", refreshToken, { secure: true, sameSite: "Strict" });
    socialLoginStore.getState().socialLogin({
      id: data.user.id,
      email: data.user.email,
      nickname: data.user.nickname,
      profileImageUrl: data.user.profileImageUrl,
      createdAt: data.user.createdAt,
      updatedAt: data.user.updatedAt,
      social: true,
    });
    return data;
  },
  postSignin: async (
    provider: "google" | "kakao",
    body: { redirectUri: string; token: string },
  ) => {
    const { data } = await axiosInstance.post<OauthSignRes>(`/oauth/sign-in/${provider}`, body);
    const { accessToken, refreshToken } = data;
    Cookies.set("accessToken", accessToken, { secure: true, sameSite: "Strict" });
    Cookies.set("refreshToken", refreshToken, { secure: true, sameSite: "Strict" });
    socialLoginStore.getState().socialLogin({
      id: data.user.id,
      email: data.user.email,
      nickname: data.user.nickname,
      profileImageUrl: data.user.profileImageUrl,
      createdAt: data.user.createdAt,
      updatedAt: data.user.updatedAt,
      social: true,
    });
    return data;
  },
};

export default OauthAPI;
