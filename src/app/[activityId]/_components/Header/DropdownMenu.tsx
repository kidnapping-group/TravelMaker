"use Client";

import myActivitiesAPI from "@/apis/myActivitiesAPI";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function DropdownMenu({ activityId }: { activityId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    await myActivitiesAPI.delete(Number(id));
    router.push("activity");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button type="button" onClick={() => setIsOpen(!isOpen)}>
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
