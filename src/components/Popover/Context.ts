"use client";

import { createContext, useContext } from "react";

interface PopoverContextProps {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  popoverRef: React.RefObject<HTMLDivElement>;
}

const PopoverContext = createContext<PopoverContextProps | null>(null);

function usePopover() {
  const context = useContext(PopoverContext);

  if (!context) {
    throw new Error("usePopover 훅은 Popover 컴포넌트 내부에 존재해야 합니다.");
  }

  return context;
}

export { PopoverContext, usePopover };
