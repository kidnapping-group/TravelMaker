"use client";

import Image from "next/image";
import { FocusEvent, KeyboardEvent, useCallback, useRef, useState } from "react";

interface DropdownProps {
  menuItems: string[];
  onChangeDropdown: (status: string) => Promise<void> | void;
  placeHolder?: string;
}

function Dropdown({ menuItems, onChangeDropdown, placeHolder }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(placeHolder || menuItems[0]);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleItemClick = useCallback(
    async (item: string) => {
      setSelectedItem(item);
      setIsOpen(false);
      await onChangeDropdown(item);
    },
    [onChangeDropdown],
  );

  const handleBlur = (e: FocusEvent<HTMLElement>) => {
    if (!dropdownRef.current?.contains(e.relatedTarget)) {
      setIsOpen(false);
    }
  };

  const moveFocus = (direction: number) => {
    setFocusedIndex(prev => (prev + direction + menuItems.length) % menuItems.length);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const keyActions: { [key: string]: () => void } = {
      ArrowDown: () => moveFocus(1),
      ArrowUp: () => moveFocus(-1),
      Enter: () => {
        if (focusedIndex >= 0) handleItemClick(menuItems[focusedIndex]);
      },
      Escape: () => setIsOpen(false),
    };
    if (keyActions[e.key]) {
      e.preventDefault();
      keyActions[e.key]();
    }
  };

  const toggleDropdown = useCallback(() => {
    setIsOpen(prev => {
      if (!prev) {
        setFocusedIndex(-1);
      }
      return !prev;
    });
  }, []);

  return (
    <div
      role="button"
      className="relative w-32"
      ref={dropdownRef}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <button
        type="button"
        className="flex h-11 w-full items-center rounded-lg bg-gray-100 text-left text-md font-medium text-black outline-none transition-colors hover:bg-gray-200 active:bg-gray-300"
        onClick={toggleDropdown}
      >
        <span className="grow truncate pl-[18px]">{selectedItem}</span>
        <Image
          className="mr-1"
          src={`/icons/icon-${isOpen ? "dropup" : "dropdown"}.svg`}
          alt="드롭다운 버튼"
          width={32}
          height={32}
        />
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 flex max-h-[300px] w-full flex-col overflow-y-auto rounded-lg bg-white p-[6px] shadow-[0_6px_20px_rgba(0,0,0,0.15)]">
          {menuItems.map((item, index) => (
            <button
              className={`${index === focusedIndex ? "bg-gray-100 text-primary-500" : ""} h-11 shrink-0 rounded-lg px-3 text-left text-md hover:bg-gray-100 hover:text-primary-500 focus:bg-gray-100 active:bg-gray-200`}
              type="button"
              key={item}
              tabIndex={0}
              ref={(el: HTMLButtonElement | null) => {
                itemRefs.current[index] = el;
              }}
              onClick={() => handleItemClick(item)}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
