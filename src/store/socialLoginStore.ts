import Cookies from "js-cookie";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// 상태 타입 정의
export interface UserInfo {
  id: string | null;
  email: string | null;
  nickname: string | null;
  profileImageUrl: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

interface SocialLoginStoreType extends UserInfo {
  social: boolean;
  socialLogin: (userInfo: UserInfo) => void;
  commonLogin: (userInfo: UserInfo) => void;
}

const socialLoginStore = create<SocialLoginStoreType>()(
  persist(
    set => ({
      social: false,
      id: null,
      email: null,
      nickname: null,
      profileImageUrl: null,
      createdAt: null,
      updatedAt: null,
      socialLogin: (userInfo: UserInfo) =>
        set({
          social: true,
          ...userInfo,
        }),
      commonLogin: (userInfo: UserInfo) =>
        set({
          social: false,
          ...userInfo,
        }),
    }),
    {
      name: "social-login-store",
      getStorage: () => ({
        getItem: name => Cookies.get(name) || null,
        setItem: (name, value) => Cookies.set(name, value, { expires: 7 }),
        removeItem: name => Cookies.remove(name),
      }),
    },
  ),
);

export default socialLoginStore;
