"use client";

import ReservationSteps from "@/app/[activityId]/_components/ReservationSteps";
import useGetActivityFooterViewModel from "@/app/[activityId]/_hooks/useGetActivityFooterViewModel";
import Modal from "@/components/Modal";

function ReservationModal() {
  const { formattedPrice } = useGetActivityFooterViewModel();

  return (
    <div className="tablet:hidden">
      <Modal title={`${formattedPrice} / 인`}>
        <ReservationSteps />
      </Modal>
    </div>
  );
}

export default ReservationModal;
