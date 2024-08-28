"use client";

import Map from "@/app/(home)/[activityId]/_components/Map";
import useGetActivityContentsViewModel from "@/app/(home)/[activityId]/_hooks/useGetActivityContentsViewModel";
import { FaLocationDot } from "react-icons/fa6";

function Contents() {
  const { address, description } = useGetActivityContentsViewModel();

  return (
    <div className="flex gap-3 pc:gap-6">
      <div className="flex w-full flex-col justify-center gap-4 tablet:gap-10">
        <div className="border-#112211 hidden border tablet:block" />
        <div className="flex flex-col justify-center gap-4">
          <p className="text-xl font-bold">체험 설명</p>
          <p className="text-lg font-normal">{description}</p>
        </div>
        <div className="border-#112211 border" />
        <div>
          <Map address={address} />
          <div className="mt-2 flex items-center gap-1">
            <FaLocationDot />
            <p>{address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contents;
