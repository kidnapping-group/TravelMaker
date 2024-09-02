"use client";

import Modal from "@/components/Modal";

import useGetActivityFooterViewModel from "../_hooks/useGetActivityFooterViewModel";
import ReservationSteps from "./ReservationSteps";

function ReservationModal() {
  const { formattedPrice } = useGetActivityFooterViewModel();

  return (
    <div className="tablet:hidden">
      <Modal title={`${formattedPrice} / 인`} id="reservationModal">
        <ReservationSteps />
      </Modal>
    </div>
  );
}

export default ReservationModal;
