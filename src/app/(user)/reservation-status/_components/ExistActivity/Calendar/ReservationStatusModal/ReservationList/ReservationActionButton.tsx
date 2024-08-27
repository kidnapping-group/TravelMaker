import { MyReservation } from "@/apis/API.type";
import usePatchReservation from "@/app/(user)/reservation-status/hooks/usePatchReservationMutation";
import { openPopup } from "@/components/Popup";
import React from "react";

function ReservationActionButton({ reservation }: { reservation: MyReservation }) {
  const { createPatchHandler } = usePatchReservation(reservation);

  return (
    <div className="flex justify-end gap-2 text-md font-bold">
      <button
        type="button"
        onClick={() => createPatchHandler("confirmed")}
        className="rounded-md bg-primary-800 px-4 py-2 text-white transition-colors duration-200 hover:bg-primary-900"
      >
        승인하기
      </button>
      <button
        type="button"
        onClick={() => openPopup("reservationDeclined")}
        className="rounded-md border border-primary-800 px-4 py-2 transition-colors duration-200 hover:bg-primary-50"
      >
        거절하기
      </button>
    </div>
  );
}

export default ReservationActionButton;
