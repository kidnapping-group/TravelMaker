import socialLoginStore from "@/store/socialLoginStore";
import Cookies from "js-cookie";

export const getCookiesUserID = (): number | null => {
  const data = socialLoginStore(state => ({
    id: state.id,
  }));
  if (data) {
    return Number(data.id);
  }
  return null;
};

export const getCookiesAccessToken = (): string | null => {
  const data = Cookies.get("accessToken");
  if (data) {
    return data;
  }
  return null;
};
