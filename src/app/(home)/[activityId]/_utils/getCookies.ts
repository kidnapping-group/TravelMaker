import Cookies from "js-cookie";

import socialLoginStore from "@/store/socialLoginStore";

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
