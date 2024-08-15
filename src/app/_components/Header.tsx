"use client";

import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

function Header() {
  const segment = useSelectedLayoutSegment();

  if (segment === "(auth)") return <div />;

  return (
    <div className="sticky top-0 z-10 bg-white">
      <div className="mx-auto flex max-w-[1224px] items-center justify-between px-6">
        <Link href="/">
          <Image src="/images/logo_small.png" alt="헤더 로고" width={165} height={55} priority />
        </Link>
        <div className="flex items-center justify-center gap-6 text-sm font-medium">
          <Link href="/signin">로그인</Link>
          <Link href="/signup">회원가입</Link>
        </div>
      </div>
    </div>
  );
}
export default Header;
