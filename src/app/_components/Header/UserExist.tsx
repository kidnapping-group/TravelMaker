import Notification from "../Notification";
import UserPopover from "./UserPopover";

function UserExist() {
  return (
    <div className="relative flex items-center justify-center gap-5 tablet:gap-3">
      <Notification />
      <div className="hidden h-6 border-r border-gray-200 tablet:block" />
      <UserPopover />
    </div>
  );
}

export default UserExist;
