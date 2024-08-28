"use client";

import { Children, isValidElement, useCallback, useEffect, useMemo, useRef, useState } from "react";

import Content from "./Content";
import Item from "./Item";
import Trigger from "./Trigger";
import { DropdownContext } from "./context";

interface DropdownProps extends React.PropsWithChildren {
  wide?: boolean;
  onSelect: (value: string) => void;
}

function Dropdown({ wide = false, onSelect, children }: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [selectedItemContent, setSelectedItemContent] = useState<string | null>(null);
  const [firstItemContent, setFirstItemContent] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSelect = useCallback(
    (value: string, content: string) => {
      onSelect(value);
      setSelectedItemContent(content);
      close();
    },
    [onSelect, setSelectedItemContent, close],
  );

  // 첫번째 Item 내용을 firstItemContent에 저장
  useEffect(() => {
    const firstItem = Children.toArray(children).find(
      child => isValidElement(child) && child.type === Content,
    );

    if (firstItem && isValidElement(firstItem)) {
      const firstChild = Children.toArray(firstItem.props.children)[0];
      if (firstChild && isValidElement(firstChild)) {
        setFirstItemContent(firstChild.props.children as string);
      }
    }
  }, [children]);

  const context = useMemo(
    () => ({
      dropdownRef,
      isOpen,
      toggle,
      close,
      selectedItemContent,
      handleSelect,
      firstItemContent,
    }),
    [isOpen, toggle, close, selectedItemContent, handleSelect, firstItemContent],
  );

  return (
    <DropdownContext.Provider value={context}>
      <div className={`${wide ? "w-full" : "w-32"} relative min-w-28`} ref={dropdownRef}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

export { Dropdown, Trigger as DropdownTrigger, Content as DropdownContent, Item as DropdownItem };
