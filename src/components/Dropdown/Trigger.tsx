"use client";

import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

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
      className="flex h-11 w-full items-center rounded-lg bg-gray-100 px-[18px] text-left text-md font-medium text-black outline-none transition-colors hover:bg-gray-200 active:bg-gray-300"
      onClick={toggle}
    >
      <p className="grow truncate">{selectedItemContent ?? initialContent}</p>
      {isOpen ? (
        <FaChevronUp className="text-gray-700" />
      ) : (
        <FaChevronDown className="text-gray-700" />
      )}
    </button>
  );
}

export default Trigger;
