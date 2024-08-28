"use client";

import useGetActivityFooterViewModel from "@/app/(home)/[activityId]/_hooks/useGetActivityFooterViewModel";
import { Button } from "@/components/Button";
import { openModal } from "@/components/Modal";

function MobileFooter() {
  const { formattedPrice } = useGetActivityFooterViewModel();

  return (
    <div className="sticky bottom-0 flex items-center justify-between bg-white p-2 px-4 tablet:hidden">
      <p className="text-xl font-bold">
        {formattedPrice} / <span className="text-2lg font-medium text-primary-800">인</span>
      </p>
      <Button size="medium" onClick={() => openModal("reservationModal")}>
        예약하기
      </Button>
    </div>
  );
}

export default MobileFooter;
