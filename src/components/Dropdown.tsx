"use client";

import Image from "next/image";
import { FocusEvent, KeyboardEvent, useCallback, useMemo, useRef, useState } from "react";

interface DropdownProps {
  menuItems: string[];
  type: "square" | "round";
  onChangeDropdown: (status: string) => Promise<void> | void;
  placeHolder?: string;
}

const styleConfig = {
  round: {
    container: "w-auto text-lg font-medium",
    button: "rounded-2xl text-green border-green p-4",
    item: "border-b text-center py-4 h-14 text-[#4B4B4B]",
    selectedText: "text-green",
    dropdownList: "",
    image: { style: "dropdown-small", size: 16 },
  },
  square: {
    container: "w-full text-base font-light",
    button: "rounded-[4px] text-[#A1A1A1] border-gray-500 py-4 pl-4",
    item: "text-left pl-2 py-2 h-10",
    selectedText: "text-gray-600",
    dropdownList: "p-2",
    image: { style: "dropdown", size: 48 },
  },
};

function Dropdown({ menuItems, type = "round", onChangeDropdown, placeHolder }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(placeHolder || menuItems[0]);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const styles = useMemo(() => styleConfig[type], [type]);

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
    <div>
      <div
        role="button"
        className={`relative inline-block min-w-32 ${styles.container}`}
        ref={dropdownRef}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <button
          type="button"
          className={`flex h-14 w-full items-center justify-between gap-2 whitespace-nowrap border ${styles.button} text-left shadow-sm outline-none`}
          onClick={toggleDropdown}
        >
          <span className={styles.selectedText}>{selectedItem}</span>
          <Image
            src={`/icons/icon-${isOpen ? "dropup" : styles.image.style}.svg`}
            alt="드롭다운 버튼"
            width={styles.image.size}
            height={styles.image.size}
          />
        </button>
        {isOpen && (
          <div
            className={`absolute ${styles.dropdownList} mt-2 w-full rounded-md border border-[#1122110D] bg-white shadow-sm`}
          >
            {menuItems.map((item, index) => (
              <button
                className={`block w-full ${styles.item} rounded-md hover:bg-gray-200 ${
                  index === focusedIndex ? "bg-gray-200" : ""
                }`}
                type="button"
                key={item}
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
    </div>
  );
}

export default Dropdown;
