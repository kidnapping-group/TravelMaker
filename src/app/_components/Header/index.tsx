"use server";

import DynamicHeader from "@/app/_components/Header/DynamicHeader";
import getUserInfoFromCookie from "@/utils/getUserInfoFromCookie";

function Header() {
  const LoginState = getUserInfoFromCookie();
  const initialUserInfo = LoginState?.state || null;

  return (
    <div className="sticky top-0 z-20 bg-white">
      <DynamicHeader initialUserInfo={initialUserInfo} />
    </div>
  );
}

export default Header;
