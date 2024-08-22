"use client";

import UserExist from "@/app/_components/Header/UserExist";
import UserNotExist from "@/app/_components/Header/UserNotExist";
import socialLoginStore from "@/store/socialLoginStore";
import logoutCookies from "@/utils/logoutCookies";
import Image from "next/image";
import Link from "next/link";

function Header() {
  const logout = socialLoginStore(state => state.logout);
  const userInfo = socialLoginStore(state => ({
    id: state.id,
    email: state.email,
    nickname: state.nickname,
    profileImageUrl: state.profileImageUrl,
    createdAt: state.createdAt,
    updatedAt: state.updatedAt,
    social: state.social,
  }));

  const handleLogout = () => {
    logout();
    logoutCookies();
  };

  return (
    <div className="sticky top-0 z-20 bg-white">
      <div className="mx-auto flex max-w-[1224px] items-center justify-between px-6">
        <Link href="/">
          <Image src="/images/logo_small.png" alt="헤더 로고" width={165} height={55} priority />
        </Link>
        {userInfo?.id ? (
          <UserExist userInfo={userInfo} onLogout={handleLogout} />
        ) : (
          <UserNotExist />
        )}
      </div>
    </div>
  );
}

export default Header;
