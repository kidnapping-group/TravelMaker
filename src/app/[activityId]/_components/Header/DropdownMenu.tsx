"use client";

import useControlDropdownMenu from "@/app/[activityId]/_hooks/useControlDropdownMenu";
import Popup, { closePopup, openPopup } from "@/components/Popup";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

function DropdownMenu({ activityId }: { activityId: string }) {
  const router = useRouter();
  const {
    isOpen,
    setIsOpen,
    dropdownRef,
    toggleDropdown,
    handleDelete,
    isReservation,
    isMyActivityId,
  } = useControlDropdownMenu();

  const createPopupType = () => {
    if (!isMyActivityId) {
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
      <Popup
        id="noMyActivity"
        text="본인의 체험만 삭제가 가능합니다."
        leftButton="확인"
        onChangeLeftButton={() => closePopup("noMyActivity")}
      />
      <Popup
        id="reservationPossible"
        text="소중한 체험을 삭제하시겠습니까?"
        leftButton="거절한다"
        onChangeLeftButton={() => closePopup("reservationPossible")}
        rightButton="삭제하기"
        onChangeRightButton={onChangeRightButton}
      />
      <Popup
        id="reservationImpossible"
        text={`체험이 만료되기 전에는\n삭제가 불가능합니다.`}
        leftButton="확인"
        onChangeLeftButton={() => closePopup("reservationImpossible")}
      />
      <div className="relative z-10" ref={dropdownRef}>
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
