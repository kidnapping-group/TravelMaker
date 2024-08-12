"use client";

import useControlDropdownMenu from "@/app/[activityId]/_hooks/useControlDropdownMenu";
import Image from "next/image";
import Link from "next/link";

function DropdownMenu({ activityId }: { activityId: string }) {
  const { isOpen, dropdownRef, toggleDropdown, handleDelete } = useControlDropdownMenu();
  // 준혁님 도와주세요 ㅠㅠㅠisError를 못가져와요
  return (
    <div className="relative" ref={dropdownRef}>
      <button type="button" onClick={toggleDropdown}>
        <Image src="/icons/icon-meatball.svg" alt="수정, 삭제 버튼보기" width={40} height={40} />
      </button>
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg">
          <div className="py-1">
            <Link
              href="myactivities/add"
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              수정하기
            </Link>
            <button
              onClick={() => handleDelete(activityId)}
              type="button"
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              삭제하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
