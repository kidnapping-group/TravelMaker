"use client";

import { useEffect, useRef } from "react";

interface TooltipProps {
  isOpen: boolean;
  close: () => void;
  text: string;
}

function Tooltip({ isOpen, close = () => {}, text }: TooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, close]);

  return (
    isOpen && (
      <div
        className="absolute top-[110%] z-10 rounded-[10px] bg-black px-4 py-2 text-md font-medium text-white opacity-75"
        role="tooltip"
        ref={tooltipRef}
      >
        {text}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 transform border-4 border-transparent border-b-gray-800" />
      </div>
    )
  );
}

export default Tooltip;
