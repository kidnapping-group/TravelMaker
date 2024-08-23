"use client";

import { Popover, PopoverContent, PopoverItem, PopoverTrigger } from "@/components/Popover";
import socialLoginStore from "@/store/socialLoginStore";
import logoutCookies from "@/utils/logoutCookies";
import Image from "next/image";
import { useRouter } from "next/navigation";

function UserDropdown() {
  const { push } = useRouter();
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
    push("/");
  };

  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex items-center gap-2">
          <div className="relative h-7 w-7">
            <Image
              className="rounded-full object-cover"
              src={userInfo?.profileImageUrl || "/icons/noProfile.svg"}
              alt="프로필 사진"
              draggable={false}
              fill
            />
          </div>
          <p className="max-w-[60px] truncate text-left text-md font-normal">
            {userInfo?.nickname}
          </p>
        </div>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverItem onClick={() => push("/account")}>마이 페이지</PopoverItem>
        <PopoverItem onClick={handleLogout}>로그아웃</PopoverItem>
      </PopoverContent>
    </Popover>
  );
}

export default UserDropdown;
