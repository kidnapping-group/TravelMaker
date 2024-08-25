"use client";

import Image from "next/image";

import { useDropdown } from "./context";

interface TriggerProps {
  placeholder?: string;
}

function Trigger({ placeholder }: TriggerProps) {
  const { toggle, isOpen, selectedItemContent, firstItemContent } = useDropdown();

  const initialContent = placeholder ?? firstItemContent;

  return (
    <button
      type="button"
      className="flex h-11 w-full items-center rounded-lg bg-gray-100 text-left text-md font-medium text-black outline-none transition-colors hover:bg-gray-200 active:bg-gray-300"
      onClick={toggle}
    >
      <p className="grow truncate pl-[18px]">{selectedItemContent ?? initialContent}</p>
      <Image
        className="mr-1"
        src={`/icons/icon-${isOpen ? "dropup" : "dropdown"}.svg`}
        alt="드롭다운 버튼"
        width={32}
        height={32}
      />
    </button>
  );
}

export default Trigger;
