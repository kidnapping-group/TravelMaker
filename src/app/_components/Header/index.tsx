"use client";

import UserExist from "@/app/_components/Header/UserExist";
import UserNotExist from "@/app/_components/Header/UserNotExist";
import socialLoginStore from "@/store/socialLoginStore";
import Image from "next/image";
import Link from "next/link";

function Header() {
  const { id } = socialLoginStore(state => ({
    id: state.id,
  }));

  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white">
      <nav className="mx-auto flex items-center justify-between px-5 tablet:px-10 pc:max-w-[1200px] pc:px-0">
        <Link href="/">
          <Image src="/images/logo_small.png" alt="헤더 로고" width={165} height={55} priority />
        </Link>
        {id ? <UserExist /> : <UserNotExist />}
      </nav>
    </header>
  );
}

export default Header;
