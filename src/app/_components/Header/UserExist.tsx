import Dropdown from "@/app/_components/Header/Dropdown";
import Notification from "@/app/_components/Notification";
import useDropdownToggle from "@/hooks/useDropdownToggle";
import { UserInfo } from "@/store/socialLoginStore";
import Image from "next/image";

interface UserExistProps {
  userInfo: UserInfo;
  onLogout: () => void;
}

function UserExist({ userInfo, onLogout }: UserExistProps) {
  const { isOpen, toggleDropdown, dropdownRef } = useDropdownToggle();

  return (
    <div className="relative flex items-center justify-center gap-3 text-sm font-medium tablet:gap-6">
      <Notification />
      <div className="h-8 border-r border-[#DDDDDD]" />
      <div ref={dropdownRef}>
        <button type="button" onClick={toggleDropdown} className="flex items-center gap-2">
          <div className="relative h-8 w-8 rounded-full">
            <Image
              className="object-cover"
              src={userInfo?.profileImageUrl || "/icons/noProfile.svg"}
              alt="프로필 사진"
              fill
            />
          </div>
          <div>
            {userInfo?.nickname}
            {isOpen && <Dropdown onLogout={onLogout} />}
          </div>
        </button>
      </div>
    </div>
  );
}

export default UserExist;
