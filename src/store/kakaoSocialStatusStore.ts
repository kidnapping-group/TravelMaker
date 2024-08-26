import { create } from "zustand";
import { persist } from "zustand/middleware";

// 상태 타입 정의
interface KakaoSocialStatusState {
  alreadyGetUserData: boolean;
  alreadyExistKakaoUser: boolean;
  socialSignupFail: () => void;
  socialLoginSuccess: () => void;
  getUserData: () => void;
}
const useKakaoSocialStatusStore = create<KakaoSocialStatusState>()(
  persist(
    set => ({
      alreadyGetUserData: false,
      alreadyExistKakaoUser: false,
      socialSignupFail: () => set({ alreadyExistKakaoUser: true }),
      socialLoginSuccess: () => set({ alreadyExistKakaoUser: false, alreadyGetUserData: false }),
      getUserData: () => set({ alreadyGetUserData: true }),
    }),
    {
      name: "kakao-social-status",
      getStorage: () => localStorage,
    },
  ),
);

export default useKakaoSocialStatusStore;
