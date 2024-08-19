"use client";

import UserExist from "@/app/_components/Header/UserExist";
import UserNotExist from "@/app/_components/Header/UserNotExist";
import { UserInfo } from "@/store/socialLoginStore";
import getUserInfoFromCookie from "@/utils/getUserInfoFromCookie";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import { useEffect, useState } from "react";

function DynamicHeader({ initialUserInfo }: { initialUserInfo: UserInfo | null }) {
  const segment = useSelectedLayoutSegment();
  const pathname = usePathname();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(initialUserInfo);

  useEffect(() => {
    const loadUserInfo = async () => {
      const LoginState = await getUserInfoFromCookie();
      if (!LoginState?.state) return;
      setUserInfo(LoginState.state);
    };
    loadUserInfo();
  }, [pathname]);

  if (segment === "(auth)") return <div />;

  return (
    <div>
      <div className="mx-auto flex max-w-[1224px] items-center justify-between px-6">
        <Link href="/">
          <Image src="/images/logo_small.png" alt="헤더 로고" width={165} height={55} priority />
        </Link>
        {userInfo?.id ? (
          <UserExist userInfo={userInfo} setUserInfo={setUserInfo} />
        ) : (
          <UserNotExist />
        )}
      </div>
    </div>
  );
}

export default DynamicHeader;
