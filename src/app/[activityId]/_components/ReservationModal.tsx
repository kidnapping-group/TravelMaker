"use client";

import ReservationSteps from "@/app/[activityId]/_components/ReservationSteps";
import useGetActivityFooterViewModel from "@/app/[activityId]/_hooks/useGetActivityFooterViewModel";
import Modal from "@/components/Modal";

function ReservationModal() {
  const { formattedPrice } = useGetActivityFooterViewModel();

  return (
    <Modal title={`${formattedPrice} / 인`}>
      <ReservationSteps />
    </Modal>
  );
}

export default ReservationModal;
