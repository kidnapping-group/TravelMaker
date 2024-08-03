"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface PopupProps {
  text: string;
  firstButton: string;
  secondButton?: string;
}

let popupToggle: React.Dispatch<React.SetStateAction<boolean>> | null = null;
function Popup({ text, firstButton, secondButton }: PopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  popupToggle = setIsOpen;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-70">
      <div className="flex flex-col items-center justify-center">
        <p>{text}</p>
        <div className="flex items-center justify-center gap-5">
          <button type="button" onClick={() => setIsOpen(false)} className="bg-blue p-4">
            {firstButton}
          </button>
          {secondButton && (
            <Link
              href={`${pathname}?confirm=1`}
              type="button"
              onClick={() => setIsOpen(false)}
              className="bg-pink-400 p-4"
            >
              {secondButton}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export const openPopup = () => popupToggle?.(true);
export default Popup;
