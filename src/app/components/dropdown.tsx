"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FocusEvent, useRef, useState } from "react";

interface MenuItemsItem {
  title: string;
  status: string;
}

interface DropDownProps {
  menuItems: MenuItemsItem[];
  type: "dropdown" | "selector";
}

function Dropdown({ menuItems, type = "dropdown" }: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState(menuItems[0].title);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  if (!menuItems.length) return null;

  const handleItemClick = (e: MenuItemsItem) => {
    setSelectedTitle(() => e.title);
    setIsOpen(false);
    if (type !== "selector") router.push(`?status=${encodeURIComponent(e.status)}`);
  };

  const handleBlur = (e: FocusEvent<HTMLElement>) => {
    if (!dropdownRef.current?.contains(e.relatedTarget)) {
      setIsOpen(false);
    }
  };

  const styleConfig = {
    dropdown: {
      styleA: "w-auto text-lg font-medium",
      styleB: "rounded-2xl text-green border-green p-4",
      styleC: "border-b text-center py-4 h-14 text-#4B4B4B",
      styleD: "text-green",
      styleE: "",
      imgStyle: "dropdown-small",
      imgSize: 16,
    },
    selector: {
      styleA: "w-full text-base font-light",
      styleB: "rounded-4px text-#A1A1A1 border-gray-500 py-4 pl-4",
      styleC: "text-left pl-2 py-2 h-10",
      styleD: "text-gray-600",
      styleE: "p-2",
      imgStyle: !isOpen ? "dropdown" : "dropup",
      imgSize: 48,
    },
  };

  const { styleA, styleB, styleC, styleD, styleE, imgStyle, imgSize } = styleConfig[type];
  const itemsToRender = type === "selector" ? menuItems.slice(1) : menuItems;

  return (
    <div>
      <div
        className={`relative inline-block min-w-32 ${styleA}`}
        ref={dropdownRef}
        onBlur={handleBlur}
      >
        <button
          type="button"
          className={`flex h-14 w-full items-center justify-between gap-2 whitespace-nowrap border ${styleB} text-left shadow-sm`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={styleD}>{selectedTitle}</span>
          <Image
            src={`/icons/icon-${imgStyle}.svg`}
            alt="드랍다운 버튼"
            width={imgSize}
            height={imgSize}
          />
        </button>
        {isOpen && (
          <div
            className={`border-#1122110D absolute ${styleE} mt-2 w-full rounded-md border bg-white shadow-sm`}
          >
            {itemsToRender.map(item => (
              <button
                className={`border-#1122110D block w-full ${styleC} rounded-md py-4 hover:bg-gray-200`}
                type="button"
                key={crypto.randomUUID()}
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
