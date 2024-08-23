import Cookies from "js-cookie";

const logoutCookies = () => {
  Cookies.remove("refreshToken");
  Cookies.remove("accessToken");
  Cookies.remove("social-login-store");
};

export default logoutCookies;
