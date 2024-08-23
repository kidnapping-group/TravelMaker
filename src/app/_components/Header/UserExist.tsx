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
          <p className="max-w-[60px] truncate text-left text-md font-normal">주먹주먹</p>
        </button>
        {isOpen && <Dropdown onLogout={onLogout} />}
      </div>
    </div>
  );
}

export default UserExist;
