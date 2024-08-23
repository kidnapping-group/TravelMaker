import Dropdown from "@/app/_components/Header/Dropdown";
import Notification from "@/app/_components/Notification";
import useDropdownToggle from "@/hooks/useDropdownToggle";
import { UserInfo } from "@/store/socialLoginStore";
import logout from "@/utils/logout";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface UserExistProps {
  userInfo: UserInfo;
  setUserInfo: Dispatch<SetStateAction<UserInfo | null>>;
}

function UserExist({ userInfo, setUserInfo }: UserExistProps) {
  const { isOpen, toggleDropdown, dropdownRef } = useDropdownToggle();

  const handleLogout = () => {
    logout();
    setUserInfo(null);
  };

  return (
    <div className="relative flex items-center justify-center gap-3 tablet:gap-3">
      <Notification />
      <div className="h-6 border-r border-gray-200" />
      <div
        ref={dropdownRef}
        className="rounded-lg px-2 py-[6px] transition-colors hover:bg-gray-100 active:bg-gray-200"
      >
        <button type="button" onClick={toggleDropdown} className="flex items-center gap-2">
          <div className="relative h-7 w-7">
            <Image
              className="rounded-full object-cover"
              src={userInfo?.profileImageUrl || "/icons/noProfile.svg"}
              alt="프로필 사진"
              draggable={false}
              fill
            />
          </div>
          <p className="text-md font-normal">{userInfo?.nickname}</p>
          {isOpen && <Dropdown onLogout={handleLogout} />}
        </button>
      </div>
    </div>
  );
}

export default UserExist;
