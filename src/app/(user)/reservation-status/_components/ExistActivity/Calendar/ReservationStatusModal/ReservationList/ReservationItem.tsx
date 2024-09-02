import { MyReservation, StatusCount } from "@/apis/API.type";

import Popup, { closePopup } from "@/components/Popup";

import usePatchReservation from "../../../../../hooks/usePatchReservationMutation";
import ReservationActionButton from "./ReservationActionButton";
import ReservationStatusView from "./ReservationStatusView";

interface ReservationItemProps {
  reservation: MyReservation;
  status: keyof StatusCount;
}

function ReservationItem({ reservation, status }: ReservationItemProps) {
  const { createPatchHandler } = usePatchReservation(reservation);

  return (
    <>
      <Popup
        id="reservationDeclined"
        text="소중한 고객의 예약을 거절하시겠습니까?"
        leftButton="취소"
        onChangeLeftButton={() => closePopup("reservationDeclined")}
        rightButton="거절"
        onChangeRightButton={() => createPatchHandler("declined")}
      />
      <div className="rounded-lg border border-gray-300 p-3 shadow-sm">
        <div className="mb-2">
          <span className="text-gray-600">닉네임</span>
          <span className="ml-2 font-semibold text-black">{reservation.nickname}</span>
        </div>
        <div className="mb-3">
          <span className="text-gray-600">인원</span>
          <span className="ml-2 font-semibold text-black">{reservation.headCount}명</span>
        </div>
        {status === "pending" ? (
          <ReservationActionButton reservation={reservation} />
        ) : (
          <ReservationStatusView status={status} />
        )}
      </div>
    </>
  );
}

export default ReservationItem;
