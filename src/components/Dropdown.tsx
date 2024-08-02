"use client";

import Image from "next/image";
import { FocusEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

interface MenuItem {
  title: string;
  status: string;
}

interface DropdownProps {
  menuItems: MenuItem[];
  type: "square" | "round";
  onChangeDropdown: (status: string) => Promise<void> | void;
}

const styleConfig = {
  square: {
    container: "w-auto text-lg font-medium",
    button: "rounded-2xl text-green border-green p-4",
    item: "border-b text-center py-4 h-14 text-[#4B4B4B]",
    selectedText: "text-green",
    dropdownList: "",
    image: { style: "dropdown-small", size: 16 },
  },
  round: {
    container: "w-full text-base font-light",
    button: "rounded-[4px] text-[#A1A1A1] border-gray-500 py-4 pl-4",
    item: "text-left pl-2 py-2 h-10",
    selectedText: "text-gray-600",
    dropdownList: "p-2",
    image: { style: "dropdown", size: 48 },
  },
};

function Dropdown({ menuItems, type = "round", onChangeDropdown }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(menuItems[0]);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  if (!menuItems.length) return null;

  const styles = styleConfig[type];
  const itemsToRender = type !== "round" ? menuItems.slice(1) : menuItems;

  const handleItemClick = async (item: MenuItem) => {
    setSelectedItem(item);
    setIsOpen(false);
    onChangeDropdown(item.status);
  };

  const handleBlur = (e: FocusEvent<HTMLElement>) => {
    if (!dropdownRef.current?.contains(e.relatedTarget)) {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex(prev => (prev < itemsToRender.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex(prev => (prev > 0 ? prev - 1 : itemsToRender.length - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (focusedIndex >= 0) {
          handleItemClick(itemsToRender[focusedIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (isOpen) {
      setFocusedIndex(-1);
    }
  }, [isOpen]);

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
          className={`flex h-14 w-full items-center justify-between gap-2 whitespace-nowrap border ${styles.button} text-left shadow-sm`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={styles.selectedText}>{selectedItem.title}</span>
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
            {itemsToRender.map((item, index) => (
              <button
                className={`block w-full ${styles.item} rounded-md hover:bg-gray-200 ${
                  index === focusedIndex ? "bg-gray-100" : ""
                }`}
                type="button"
                key={item.status}
                ref={(el: HTMLButtonElement | null) => {
                  itemRefs.current[index] = el;
                }}
                onClick={() => handleItemClick(item)}
              >
                {item.title}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dropdown;
