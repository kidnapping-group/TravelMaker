"use client";

import { useCallback, useMemo, useRef, useState } from "react";

import Content from "./Content";
import { PopoverContext } from "./Context";
import Item from "./Item";
import Trigger from "./Trigger";

function Popover({ children }: { children: React.ReactNode }) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const context = useMemo(
    () => ({
      isOpen,
      toggle,
      close,
      popoverRef,
    }),
    [isOpen, toggle, close, popoverRef],
  );

  return (
    <PopoverContext.Provider value={context}>
      <div ref={popoverRef}>{children}</div>
    </PopoverContext.Provider>
  );
}

export { Popover, Trigger as PopoverTrigger, Content as PopoverContent, Item as PopoverItem };
