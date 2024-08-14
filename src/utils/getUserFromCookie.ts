import { UsersRes } from "@/apis/API.type";
import Cookies from "js-cookie";

function getUserFromCookie(): UsersRes | null {
  if (typeof window === "undefined") {
    return null;
  }

  const userCookie = Cookies.get("user");

  if (userCookie) {
    return JSON.parse(userCookie);
  }

  return null;
}

export default getUserFromCookie;
