import Notification from "@/app/_components/Notification";

import UserDropdown from "./UserDropdown";

function UserExist() {
  return (
    <div className="relative flex items-center justify-center gap-3 tablet:gap-3">
      <Notification />
      <div className="h-6 border-r border-gray-200" />
      <UserDropdown />
    </div>
  );
}

export default UserExist;
