"use client";

import { useCallback, useEffect } from "react";

import { useDropdown } from "./context";

function Content({ children }: { children: React.ReactNode }) {
  const { dropdownRef, isOpen, close } = useDropdown();

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        close();
      }
    },
    [dropdownRef, isOpen, close],
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    isOpen && (
      <div className="absolute z-10 mt-2 flex max-h-[300px] w-full flex-col overflow-y-auto rounded-lg bg-white p-[6px] shadow-[0_6px_20px_rgba(0,0,0,0.15)]">
        {children}
      </div>
    )
  );
}

export default Content;
