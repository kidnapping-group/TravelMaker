"use client";

import Image from "next/image";
import { FocusEvent, useRef, useState } from "react";

interface MenuItem {
  title: string;
  status: string;
}

interface DropdownProps {
  menuItems: MenuItem[];
  type: "dropdown" | "selector";
  onChangeDropdown: (status: string) => Promise<void> | void;
}

const styleConfig = {
  dropdown: {
    container: "w-auto text-lg font-medium",
    button: "rounded-2xl text-green border-green p-4",
    item: "border-b text-center py-4 h-14 text-[#4B4B4B]",
    selectedText: "text-green",
    dropdownList: "",
    image: { style: "dropdown-small", size: 16 },
  },
  selector: {
    container: "w-full text-base font-light",
    button: "rounded-[4px] text-[#A1A1A1] border-gray-500 py-4 pl-4",
    item: "text-left pl-2 py-2 h-10",
    selectedText: "text-gray-600",
    dropdownList: "p-2",
    image: { style: "dropdown", size: 48 },
  },
};

function Dropdown({ menuItems, type = "dropdown", onChangeDropdown }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(menuItems[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  if (!menuItems.length) return null;

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

  const styles = styleConfig[type];
  const itemsToRender = type !== "dropdown" ? menuItems.slice(1) : menuItems;

  return (
    <div>
      <div
        className={`relative inline-block min-w-32 ${styles.container}`}
        ref={dropdownRef}
        onBlur={handleBlur}
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
            {itemsToRender.map(item => (
              <button
                className={`block w-full ${styles.item} rounded-md hover:bg-gray-200`}
                type="button"
                key={item.status}
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
