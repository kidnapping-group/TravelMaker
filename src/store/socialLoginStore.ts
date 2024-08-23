import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserInfo {
  id: string | null;
  email: string | null;
  nickname: string | null;
  profileImageUrl: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  social: boolean;
}

interface SocialLoginStoreType extends UserInfo {
  socialLogin: (userInfo: UserInfo) => void;
  commonLogin: (userInfo: UserInfo) => void;
  logout: () => void; // 새로운 로그아웃 액션
}

const initialState: UserInfo = {
  id: null,
  email: null,
  nickname: null,
  profileImageUrl: null,
  createdAt: null,
  updatedAt: null,
  social: false,
};

const socialLoginStore = create<SocialLoginStoreType>()(
  persist(
    set => ({
      ...initialState,
      socialLogin: (userInfo: UserInfo) =>
        set({
          ...userInfo,
          social: true,
        }),

      commonLogin: (userInfo: UserInfo) =>
        set({
          ...userInfo,
          social: false,
        }),
      logout: () => set(initialState),
    }),
    {
      name: "social-login-store",
    },
  ),
);

export default socialLoginStore;
