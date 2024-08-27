"use client";

import { useDropdown } from "./context";

interface ItemProps {
  value?: string;
  children: string;
}

function Item({ value = "", children }: ItemProps) {
  const { handleSelect } = useDropdown();

  return (
    <button
      className="h-11 shrink-0 rounded-lg px-3 text-left text-md hover:bg-gray-100 hover:text-primary-500 focus:bg-gray-100 active:bg-gray-200"
      type="button"
      onClick={() => handleSelect(value, children)}
    >
      {children}
    </button>
  );
}

export default Item;
