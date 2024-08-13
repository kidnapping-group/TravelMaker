"use client";

import useControlDropdownMenu from "@/app/[activityId]/_hooks/useControlDropdownMenu";
import Image from "next/image";
import Link from "next/link";

function DropdownMenu({ activityId }: { activityId: string }) {
  const { isOpen, dropdownRef, toggleDropdown, handleDelete } = useControlDropdownMenu();

  return (
    <div className="relative" ref={dropdownRef}>
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
              onClick={() => handleDelete(activityId)}
              type="button"
              className="block w-full border-t border-[#DDDDDD] py-3 text-center text-gray-700 hover:bg-gray-100"
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
