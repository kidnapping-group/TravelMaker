"use server";

import DynamicHeader from "@/app/_components/Header/DynamicHeader";
import getUserInfoFromCookie from "@/utils/getUserInfoFromCookie";

function Header() {
  const LoginState = getUserInfoFromCookie();
  const initialUserInfo = LoginState?.state || null;

  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white">
      <DynamicHeader initialUserInfo={initialUserInfo} />
    </header>
  );
}

export default Header;
