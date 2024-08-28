"use client";

import { useEffect } from "react";

import { usePopover } from "./Context";

function Content({ children }: { children: React.ReactNode }) {
  const { isOpen, close, popoverRef } = usePopover();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (isOpen && popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        close();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, close, popoverRef]);

  return (
    isOpen && (
      <div className="absolute right-0 top-full z-10 mt-1 flex w-[120px] flex-col overflow-hidden rounded-lg border bg-white p-[6px] shadow-[0_6px_20px_rgba(0,0,0,0.15)]">
        {children}
      </div>
    )
  );
}

export default Content;
