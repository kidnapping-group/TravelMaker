import Cookies from "js-cookie";

interface UserProfile {
  social: boolean;
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

interface SocialLoginStore {
  state: UserProfile;
  version: number;
}

const getCookiesUserID = (): number | null => {
  const data = Cookies.get("social-login-store");
  if (data) {
    const parseData: SocialLoginStore = JSON.parse(data);
    return parseData.state.id;
  }
  return null;
};

export default getCookiesUserID;
