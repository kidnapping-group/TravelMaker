"use client";

import UserExist from "@/app/_components/Header/UserExist";
import UserNotExist from "@/app/_components/Header/UserNotExist";
import socialLoginStore from "@/store/socialLoginStore";
import logoutCookies from "@/utils/logoutCookies";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

function Header() {
  const router = useRouter();
  const queryClient = useQueryClient();
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
    router.push("/");
    queryClient.removeQueries();
  };

  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white">
      <nav className="mx-auto flex items-center justify-between px-5 tablet:px-10 pc:max-w-[1200px] pc:px-0">
        <Link href="/">
          <Image src="/images/logo_small.png" alt="헤더 로고" width={165} height={55} priority />
        </Link>
        {userInfo?.id ? <UserExist /> : <UserNotExist />}
      </nav>
    </header>
  );
}

export default Header;
