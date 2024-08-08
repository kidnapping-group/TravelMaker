"use client";

import useViewport from "@/hooks/useViewport";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface MobileNavProps {
  pathname: string;
}

interface DesktoNavProps extends MobileNavProps {
  hovered: string | null;
  setHovered: React.Dispatch<React.SetStateAction<string | null>>;
}

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

function TopNavigation({ pathname }: MobileNavProps) {
  return (
    <div className="fixed left-0 top-[55px] flex w-full justify-around bg-white pt-[10px] text-center">
      {navItems.map(item => (
        <Link
          key={item.label}
          href={item.href}
          className={`border-gray h-[30px] w-full cursor-pointer border-b-2 ${
            pathname === item.href
              ? "border-b-[3px] border-primary-500 font-bold text-primary-500"
              : ""
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

function SideNavigation({ pathname, hovered, setHovered }: DesktoNavProps) {
  return (
    <div className="flex w-[300px] flex-col gap-[5px] rounded-[6px] bg-gray-200 p-4 shadow-md">
      {navItems.map(item => {
        const isActive = pathname === item.href;
        const isHovered = hovered === item.href;

        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex h-[50px] w-full cursor-pointer items-center gap-[14px] rounded-[6px] px-[16px] py-[10px] ${
              isActive || isHovered ? "bg-primary-500 font-semibold text-white" : ""
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
  );
}

function Navigation() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);
  const viewport = useViewport();

  return (
    <div>
      {(viewport === "mobile" || viewport === "tablet") && <TopNavigation pathname={pathname} />}
      {viewport === "pc" && (
        <SideNavigation pathname={pathname} hovered={hovered} setHovered={setHovered} />
      )}
    </div>
  );
}

export default Navigation;
