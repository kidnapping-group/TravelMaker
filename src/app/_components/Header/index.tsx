"use server";

import HeaderLayout from "@/app/_components/Header/HeaderLayout";
import getUserInfoFromCookie from "@/utils/getUserInfoFromCookie";

function Header() {
  const loginStatus = getUserInfoFromCookie();
  const userInfo = loginStatus?.state;

  return (
    <div className="sticky top-0 z-20 bg-white">
      <HeaderLayout initialUserInfo={userInfo} />
    </div>
  );
}

export default Header;
