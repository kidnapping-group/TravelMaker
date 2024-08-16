"use server";

import DynamicHeader from "@/app/_components/Header/DynamicHeader";
import getUserInfoFromCookie from "@/utils/getUserInfoFromCookie";

function Header() {
  const loginStatus = getUserInfoFromCookie();
  const userInfo = loginStatus?.state;

  return (
    <div className="sticky top-0 z-20 bg-white">
      <DynamicHeader initialUserInfo={userInfo} />
    </div>
  );
}

export default Header;
