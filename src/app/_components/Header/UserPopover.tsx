"use client";

import { Popover, PopoverContent, PopoverItem, PopoverTrigger } from "@/components/Popover";
import socialLoginStore from "@/store/socialLoginStore";
import logoutCookies from "@/utils/logoutCookies";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";

function UserPopover() {
  const { push } = useRouter();
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
    queryClient.removeQueries();
    push("/");
  };

  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex items-center gap-2 rounded-lg transition-colors tablet:px-2 tablet:py-[6px] tablet:hover:bg-gray-100 tablet:active:bg-gray-200">
          <div className="relative h-7 w-7 overflow-hidden rounded-full transition hover:opacity-60 tablet:hover:opacity-100">
            <Image
              className="object-cover"
              src={userInfo?.profileImageUrl || "/icons/noProfile.svg"}
              alt="프로필 사진"
              draggable={false}
              fill
            />
          </div>
          <p className="hidden max-w-[60px] truncate text-left text-md font-normal tablet:block">
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

export default UserPopover;
