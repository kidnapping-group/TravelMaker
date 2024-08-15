import Cookies from "js-cookie";

const deleteUserInfo = () => {
  Cookies.remove("refreshToken");
  Cookies.remove("accessToken");
  Cookies.remove("social-login-store");
};

export default deleteUserInfo;
