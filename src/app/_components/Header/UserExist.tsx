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
    <div className="relative flex items-center justify-center gap-3 text-sm font-medium tablet:gap-6">
      <Notification />
      <div className="h-8 border-r border-[#DDDDDD]" />
      <div ref={dropdownRef}>
        <button type="button" onClick={toggleDropdown} className="flex items-center gap-2">
          <div className="relative h-8 w-8 rounded-full">
            <Image
              src={userInfo?.profileImageUrl || "/icons/noProfile.svg"}
              alt="프로필 사진"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div>
            {userInfo?.nickname}
            {isOpen && <Dropdown onLogout={handleLogout} />}
          </div>
        </button>
      </div>
    </div>
  );
}

export default UserExist;
