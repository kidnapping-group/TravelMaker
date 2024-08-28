"use client";

import useMediaQuery from "@/hooks/useMediaQuery";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaCalendar, FaGear, FaListCheck, FaUser } from "react-icons/fa6";

interface NavProps {
  pathname: string;
}

const navItems = [
  {
    href: "/account",
    label: "내 정보",
    icon: <FaUser />,
  },
  {
    href: "/reservations",
    label: "예약 내역",
    icon: <FaListCheck />,
  },
  {
    href: "/myactivities",
    label: "내 체험 관리",
    icon: <FaGear />,
  },
  {
    href: "/reservation-status",
    label: "예약 현황",
    icon: <FaCalendar />,
  },
];

function TopNavigation({ pathname }: NavProps) {
  return (
    <div className="fixed left-0 top-[55px] z-10 flex w-full justify-around bg-white pt-[10px] text-center">
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

function SideNavigation({ pathname }: NavProps) {
  return (
    <div className="flex w-[250px] flex-col gap-[5px] rounded-lg bg-white p-[6px] shadow-[0_6px_20px_rgba(0,0,0,0.15)]">
      {navItems.map(({ label, href, icon }) => (
        <Link
          key={label}
          href={href}
          className={`flex h-[50px] w-full cursor-pointer items-center gap-3 rounded-[6px] px-[16px] py-[10px] hover:bg-gray-100 active:bg-gray-200 ${
            pathname === href
              ? "bg-gray-100 font-bold text-primary-500"
              : "text-gray-500 hover:text-black"
          }`}
        >
          {icon}
          {label}
        </Link>
      ))}
    </div>
  );
}

function Navigation() {
  const pathname = usePathname();
  const { isMobile, isTablet, isPc } = useMediaQuery();

  return (
    <div>
      {(isMobile || isTablet) && <TopNavigation pathname={pathname} />}
      {isPc && <SideNavigation pathname={pathname} />}
    </div>
  );
}

export default Navigation;
