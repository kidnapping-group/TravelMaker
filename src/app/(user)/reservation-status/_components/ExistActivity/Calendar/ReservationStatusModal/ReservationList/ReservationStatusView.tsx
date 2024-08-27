import { StatusCount } from "@/apis/API.type";

function ReservationStatusView({ status }: { status: keyof StatusCount }) {
  return (
    <div className="flex justify-end">
      {status === "confirmed" ? (
        <div className="flex h-[44px] w-[82px] items-center justify-center rounded-3xl bg-[#FFF4E8] text-md font-bold text-[#FF7C1D]">
          예약 승인
        </div>
      ) : (
        <div className="flex h-[44px] w-[82px] items-center justify-center rounded-3xl bg-[#FFE4E0] text-md font-bold text-[#FF472E]">
          예약 거절
        </div>
      )}
    </div>
  );
}

export default ReservationStatusView;
