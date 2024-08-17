import Cookies from "js-cookie";

const logout = () => {
  Cookies.remove("refreshToken");
  Cookies.remove("accessToken");
  Cookies.remove("social-login-store");
};

export default logout;
