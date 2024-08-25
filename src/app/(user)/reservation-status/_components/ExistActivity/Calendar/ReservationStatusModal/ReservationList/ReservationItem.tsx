import { MyReservation } from "@/apis/API.type";
import usePatchReservation from "@/app/(user)/reservation-status/hooks/usePatchReservationMutation";
import Popup, { closePopup, openPopup } from "@/components/Popup";

function ReservationItem({ reservation }: { reservation: MyReservation }) {
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
      </div>
    </>
  );
}

export default ReservationItem;
