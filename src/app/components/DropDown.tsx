"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useId, useRef, useState } from "react";

// 데이터 있을경우 최소너비 w-32 없으면 최소너비 없어야하고 폼상황에서 w-full
// blur처리도 해줘야해
function DropDown({ status, mockData }) {
  const mockId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState(status);
  const dropdownRef = useRef(null);
  const router = useRouter();
  if (!mockData.length) return null;

  const handleItemClick = title => {
    setSelectedTitle(() => title);
    setIsOpen(false);
    router.push(`?status=${title}`);
  };

  const handleBlur = e => {
    if (!dropdownRef.current.contains(e.relatedTarget)) {
      setIsOpen(false);
    }
  };

  const a = (
    <div className="border-#1122110D absolute mt-2 w-full rounded-md border bg-white shadow-sm">
      {mockData.map((item, index) => (
        <button
          className="text-#4B4B4B border-#1122110D block h-14 w-full border-b py-4 text-center"
          type="button"
          key={`${mockId}-${index + 1}`}
          onClick={() => handleItemClick(item.title)}
        >
          {item.title}
        </button>
      ))}
    </div>
  );

  return (
    <div>
      <div
        className="relative inline-block min-w-32 text-lg font-light"
        ref={dropdownRef}
        onBlur={handleBlur}
      >
        <button
          type="button"
          className="flex h-53px w-full items-center justify-between gap-2 whitespace-nowrap rounded-2xl border border-green p-4 text-left shadow-sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-green">{status}</span>
          <Image src="/icons/icon-dropdown-small.svg" alt="드랍다운 버튼" width={16} height={16} />
        </button>
        {isOpen && a}
      </div>
    </div>
  );
}

export default DropDown;
