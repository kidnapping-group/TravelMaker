"use server";

import { cookies } from "next/headers";

import { UserInfo } from "@/store/socialLoginStore";

export interface LoginStatus {
  state: UserInfo;
  version: number;
}

const getUserInfoFromCookie = (): LoginStatus | null => {
  const cookieStore = cookies();
  const cookieData = cookieStore.get("social-login-store");

  if (cookieData && cookieData.value) {
    return JSON.parse(cookieData.value);
  }

  return null;
};

export default getUserInfoFromCookie;
