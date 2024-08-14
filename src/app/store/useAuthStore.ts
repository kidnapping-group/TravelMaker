import { UsersRes } from "@/apis/API.type";
import Cookies from "js-cookie";
import { create } from "zustand";

interface AuthStore {
  user: UsersRes | null;
  setUser: (user: UsersRes) => void;
  clearUser: () => void;
}

const useAuthStore = create<AuthStore>(set => ({
  user: null,
  setUser: user => {
    set({ user });
    Cookies.set("user", JSON.stringify(user), { expires: 7 });
  },
  clearUser: () => {
    set({ user: null });
    Cookies.remove("user");
  },
}));

export const initializeAuthStore = () => {
  const userCookie = Cookies.get("user");
  if (userCookie) {
    const user = JSON.parse(userCookie);
    useAuthStore.getState().setUser(user);
  }
};

export default useAuthStore;
