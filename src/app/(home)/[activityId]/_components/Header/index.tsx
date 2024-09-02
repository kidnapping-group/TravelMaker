"use client";

import { FaLocationDot, FaStar } from "react-icons/fa6";

import useGetActivityHeaderViewModel from "../../_hooks/useGetActivityHeaderViewModel";
import DropdownMenu from "./DropdownMenu";

function Header() {
  const { category, title, rating, reviewCount, address, activityId } =
    useGetActivityHeaderViewModel();

  return (
    <div>
      <p className="text- mt-4 text-md font-normal">{category}</p>
      <div className="mt-3 flex items-center justify-between text-2xl font-bold">
        <h1>{title}</h1>
        <DropdownMenu activityId={activityId} />
      </div>
      <div className="mt-4 flex items-center gap-3 text-md font-normal">
        <div className="flex items-center justify-center gap-1">
          <FaStar color="gold" />
          <p>{rating}</p>
          <p>({reviewCount})</p>
        </div>
        <div className="flex items-center justify-center gap-1">
          <FaLocationDot />
          <p>{address}</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
