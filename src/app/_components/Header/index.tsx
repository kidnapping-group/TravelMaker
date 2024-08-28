"use client";

import UserExist from "@/app/_components/Header/UserExist";
import UserNotExist from "@/app/_components/Header/UserNotExist";
import socialLoginStore from "@/store/socialLoginStore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function Header() {
  const { id } = socialLoginStore(state => ({
    id: state.id,
  }));

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id !== undefined) {
      setIsLoading(false);
    }
  }, [id]);

  return (
    <header className="fixed top-0 z-30 flex h-[60px] w-full items-center border-b border-gray-200 bg-white">
      <div className="mx-auto flex w-full items-center justify-between px-5 tablet:px-10 pc:max-w-[1200px] pc:px-0">
        <Link href="/" scroll>
          <Image src="/images/logo_small.png" alt="헤더 로고" width={165} height={55} priority />
        </Link>
        {!isLoading && (id ? <UserExist /> : <UserNotExist />)}
      </div>
    </header>
  );
}

export default Header;
