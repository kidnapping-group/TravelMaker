"use client";

import DropdownMenu from "@/app/[activityId]/_components/Header/DropdownMenu";
import useGetActivityHeaderViewModel from "@/app/[activityId]/_hooks/useGetActivityHeaderViewModel";
import Image from "next/image";

function Header() {
  const { category, title, rating, reviewCount, address } = useGetActivityHeaderViewModel();

  return (
    <div>
      <p className="text- mt-4 text-md font-normal">{category}</p>
      <div className="mt-3 flex items-center justify-between text-2xl font-bold">
        <h1>{title}</h1>
        <DropdownMenu />
        {/* <Image src="/icons/icon-meatball.svg" alt="수정, 삭제 버튼보기" width={40} height={40} /> */}
      </div>
      <div className="mt-4 flex items-center gap-3 text-md font-normal">
        <div className="flex items-center justify-center gap-1">
          <Image src="icons/Icon_star_on.svg" alt="평점" width={16} height={16} />
          <p>{rating}</p>
          <p>({reviewCount})</p>
        </div>
        <div className="flex items-center justify-center gap-1">
          <Image src="icons/icon-location.svg" alt="위치 아이콘" width={18} height={18} />
          <p>{address}</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
