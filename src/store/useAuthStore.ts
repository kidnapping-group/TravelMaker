import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
  login: (accessToken, refreshToken) => set({ isLoggedIn: true, accessToken, refreshToken }),
  logout: () => set({ isLoggedIn: false, accessToken: null, refreshToken: null }),
}));

export default useAuthStore;
