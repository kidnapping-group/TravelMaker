"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/Button";

interface PopupProps {
  id: string;
  text: string;
  leftButton: string;
  onChangeLeftButton: () => void;
  rightButton?: string;
  onChangeRightButton?: () => void;
}

const popupControls: { [key: string]: (isOpen: boolean) => void } = {};

function Popup({
  id,
  text,
  leftButton,
  onChangeLeftButton,
  rightButton,
  onChangeRightButton,
}: PopupProps) {
  const [isOpen, setIsOpen] = useState(false);

  const controlRef = useRef((e: boolean) => setIsOpen(e));

  useEffect(() => {
    popupControls[id] = controlRef.current;
    return () => {
      delete popupControls[id];
    };
  }, [id]);

  const handleLeftButtonClick = useCallback(() => {
    onChangeLeftButton();
    setIsOpen(false);
  }, [onChangeLeftButton]);

  const handleRightButtonClick = useCallback(() => {
    onChangeRightButton?.();
    setIsOpen(false);
  }, [onChangeRightButton]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="flex w-full max-w-[350px] flex-col items-center rounded-[10px] bg-white p-5">
        <p className="py-8 text-center text-lg font-medium text-black">{text}</p>
        <div className="flex w-full justify-center gap-3">
          <Button
            size="wide"
            variant={rightButton ? "outline" : "default"}
            onClick={handleLeftButtonClick}
          >
            {leftButton}
          </Button>
          {rightButton && (
            <Button size="wide" variant="default" onClick={handleRightButtonClick}>
              {rightButton}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export const openPopup = (id: string) => {
  popupControls[id]?.(true);
};

export const closePopup = (id: string) => {
  popupControls[id]?.(false);
};

export default Popup;
