import Cookies from "js-cookie";

const getCookiesUserID = () => {
  const data = Cookies.get("social-login-store");
  if (data) {
    const parseData = JSON.parse(data);
    return parseData.state.id;
  }
  return null;
};

export default getCookiesUserID;
