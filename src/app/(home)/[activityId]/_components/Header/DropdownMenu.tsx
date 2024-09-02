"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaEllipsisVertical } from "react-icons/fa6";

import { openPopup } from "@/components/Popup";

import useControlDropdownMenu from "../../_hooks/useControlDropdownMenu";
import useControlPopup from "../../_hooks/useControlPopup";
import DropdownMenuPopup from "./DropdownMenuPopup";

function DropdownMenu({ activityId }: { activityId: string }) {
  const router = useRouter();
  const { isOpen, setIsOpen, dropdownRef, toggleDropdown, handleDelete } = useControlDropdownMenu();
  const { isReservation, isUser } = useControlPopup();

  if (!isUser) return null;

  const createPopupType = () => {
    if (!isUser) {
      openPopup("noMyActivity");
    } else if (isReservation) {
      openPopup("reservationPossible");
    } else {
      openPopup("reservationImpossible");
    }

    setIsOpen(false);
  };

  const onChangeRightButton = () => {
    handleDelete(activityId);
    router.push("/", { scroll: true });
  };

  return (
    <>
      <DropdownMenuPopup onChangeRightButton={onChangeRightButton} />
      <div className="relative z-[2]" ref={dropdownRef}>
        <button
          className="rounded-lg p-1 text-gray-700 transition-colors hover:bg-gray-100 active:bg-gray-200"
          type="button"
          onClick={toggleDropdown}
        >
          <FaEllipsisVertical size={20} />
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-40 rounded-md border-[#DDDDDD] bg-white text-2lg font-medium shadow-lg">
            <div>
              <Link
                href={`myactivities/edit/${activityId}`}
                className="block w-full py-3 text-center text-gray-700 hover:bg-gray-100"
              >
                수정하기
              </Link>
              <button
                onClick={createPopupType}
                type="button"
                className="block w-full border-t border-[#DDDDDD] py-3 text-center text-gray-700 hover:bg-gray-100"
              >
                삭제하기
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default DropdownMenu;
