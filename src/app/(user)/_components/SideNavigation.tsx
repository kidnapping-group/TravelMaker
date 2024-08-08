"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const navItems = [
  {
    href: "/account",
    label: "내 정보",
    icon: "/icons/icon-account-black.svg",
    iconActive: "/icons/icon-account-white.svg",
  },
  {
    href: "/reservations",
    label: "예약 내역",
    icon: "/icons/icon-history-black.svg",
    iconActive: "/icons/icon-history-white.svg",
  },
  {
    href: "/myactivities",
    label: "내 체험 관리",
    icon: "/icons/icon-setting-black.svg",
    iconActive: "/icons/icon-setting-white.svg",
  },
  {
    href: "/reservation-status",
    label: "예약 현황",
    icon: "/icons/icon-calendar-black.svg",
    iconActive: "/icons/icon-calendar-white.svg",
  },
];

function SideNavigation() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div>
      <div className="block pc:hidden">
        <div className="fixed left-0 top-[55px] flex w-full justify-around bg-white pt-[10px] text-center">
          {navItems.map(item => (
            <Link
              key={item.label}
              href={item.href}
              className={`border-gray h-[30px] w-full cursor-pointer border-b-2 ${
                pathname === item.href ? "border-b-[3px] border-[blue] font-bold text-[blue]" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="hidden pc:block">
        <div className="flex w-[300px] flex-col gap-[5px] rounded-[6px] bg-gray-200 p-4 shadow-md">
          {navItems.map(item => {
            const isActive = pathname === item.href;
            const isHovered = hovered === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex h-[50px] w-full cursor-pointer items-center gap-[14px] rounded-[6px] px-[16px] py-[10px] ${
                  isActive || isHovered ? "bg-[blue] font-semibold text-white" : ""
                }`}
                onMouseEnter={() => setHovered(item.href)}
                onMouseLeave={() => setHovered(null)}
              >
                <Image
                  src={isActive || isHovered ? item.iconActive : item.icon}
                  alt={item.label}
                  width={24}
                  height={24}
                  priority
                />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SideNavigation;
