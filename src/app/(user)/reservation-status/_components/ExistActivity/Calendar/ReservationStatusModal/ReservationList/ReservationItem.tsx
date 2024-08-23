import { MyReservation } from "@/apis/API.type";

function ReservationItem({ reservation }: { reservation: MyReservation }) {
  return (
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
          className="rounded-md bg-primary-800 px-4 py-2 text-white transition-colors duration-200 hover:bg-primary-900"
        >
          승인하기
        </button>
        <button
          type="button"
          className="rounded-md border border-primary-800 px-4 py-2 transition-colors duration-200 hover:bg-primary-50"
        >
          거절하기
        </button>
      </div>
    </div>
  );
}

export default ReservationItem;
