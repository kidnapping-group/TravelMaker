"use client";

import DropdownMenuPopup from "@/app/[activityId]/_components/Header/DropdownMenuPopup";
import useControlDropdownMenu from "@/app/[activityId]/_hooks/useControlDropdownMenu";
import useControlPopup from "@/app/[activityId]/_hooks/useControlPopup";
import { openPopup } from "@/components/Popup";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
    router.push("/");
  };

  return (
    <>
      <DropdownMenuPopup onChangeRightButton={onChangeRightButton} />
      <div className="relative z-[2]" ref={dropdownRef}>
        <button type="button" onClick={toggleDropdown}>
          <Image src="/icons/icon-meatball.svg" alt="수정, 삭제 버튼보기" width={40} height={40} />
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-40 rounded-md border-[#DDDDDD] bg-white text-2lg font-medium shadow-lg">
            <div>
              <Link
                href="myactivities/add"
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
