import { create } from "zustand";
import { persist } from "zustand/middleware";

// 상태 타입 정의
interface KakaoSocialStatusState {
  alreadyExistKakaoUser: boolean;
  socialSignupFail: () => void;
  socialLoginSuccess: () => void;
}
const useKakaoSocialStatusStore = create<KakaoSocialStatusState>()(
  persist(
    set => ({
      alreadyExistKakaoUser: false,
      socialSignupFail: () => set({ alreadyExistKakaoUser: true }),
      socialLoginSuccess: () => set({ alreadyExistKakaoUser: false }),
    }),
    {
      name: "kakao-social-status",
      getStorage: () => localStorage,
    },
  ),
);

export default useKakaoSocialStatusStore;
