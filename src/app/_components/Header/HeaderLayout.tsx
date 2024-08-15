"use client";

import UserExist from "@/app/_components/Header/UserExist";
import UserNotExist from "@/app/_components/Header/UserNotExist";
import { UserInfo } from "@/store/socialLoginStore";
import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useEffect, useState } from "react";

function HeaderLayout({ initialUserInfo }: { initialUserInfo?: UserInfo }) {
  const segment = useSelectedLayoutSegment();
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(initialUserInfo);

  useEffect(() => {
    setUserInfo(initialUserInfo);
  }, [initialUserInfo]);

  if (segment === "(auth)") return <div />;

  return (
    <div>
      <div className="mx-auto flex max-w-[1224px] items-center justify-between px-6">
        <Link href="/">
          <Image src="/images/logo_small.png" alt="헤더 로고" width={165} height={55} priority />
        </Link>
        {userInfo ? <UserExist userInfo={userInfo} setUserInfo={setUserInfo} /> : <UserNotExist />}
      </div>
    </div>
  );
}

export default HeaderLayout;
