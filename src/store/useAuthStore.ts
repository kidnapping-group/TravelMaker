import { create } from "zustand";

const useAuthStore = create(set => ({
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
  login: (accessToken: string, refreshToken: string) =>
    set({
      isLoggedIn: true,
      accessToken,
      refreshToken,
    }),
  logout: () =>
    set({
      isLoggedIn: false,
      accessToken: null,
      refreshToken: null,
    }),
}));

export default useAuthStore;
