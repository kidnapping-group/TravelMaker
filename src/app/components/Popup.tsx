"use client";

import { Button, LinkButton } from "@/components/Button";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface PopupProps {
  text: string;
  onCloseButton: string;
  onChangeButton?: string;
}

let popupToggle: React.Dispatch<React.SetStateAction<boolean>> | null = null;

function Popup({ text, onCloseButton, onChangeButton }: PopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  popupToggle = setIsOpen;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="flex w-full max-w-[350px] flex-col items-center rounded-[10px] bg-white p-5">
        <p className="py-8 text-lg font-medium text-black">{text}</p>
        <div className="flex w-full justify-center gap-3">
          <Button
            size="wide"
            variant={onChangeButton ? "outline" : "default"}
            onClick={() => setIsOpen(false)}
          >
            {onCloseButton}
          </Button>
          {onChangeButton && (
            <LinkButton size="wide" href={`${pathname}?confirm=1`} onClick={() => setIsOpen(false)}>
              {onChangeButton}
            </LinkButton>
          )}
        </div>
      </div>
    </div>
  );
}

export const openPopup = () => popupToggle?.(true);
export default Popup;
