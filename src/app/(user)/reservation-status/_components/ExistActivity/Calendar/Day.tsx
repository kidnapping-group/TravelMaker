import { openModal } from "@/components/Modal";

export type ReservationStatus = "completed" | "pending" | "confirmed";
export interface Reservation {
  id?: string;
  status: ReservationStatus;
  title: string;
}

export interface DayData {
  day: number;
  reservations: Reservation[];
  hasEvent: boolean;
  isCurrentMonth: boolean;
}

interface DayProps {
  dayData: DayData;
}

const statusColors = {
  completed: "bg-gray-300 text-gray-800",
  pending: "bg-blue-500 text-white",
  confirmed: "bg-[#FFF4E8] text-[#FF7C1D]",
};

function Day({ dayData }: DayProps) {
  return (
    <button type="button" onClick={openModal}>
      <div
        className={`flex h-32 flex-col justify-between border p-[2px] font-medium ${dayData.isCurrentMonth ? "bg-white" : "bg-gray-100"}`}
      >
        <div className="ml-2 mt-2 flex w-9 items-start gap-1">
          <span className={`${dayData.isCurrentMonth ? "" : "text-gray-300"} text-xl leading-6`}>
            {Math.abs(dayData.day)}
          </span>
          {dayData.hasEvent && <div className="h-2 w-2 rounded-full bg-blue-500" />}
        </div>
        <div>
          {dayData.isCurrentMonth &&
            dayData.reservations.map(reservation => (
              <div
                key={crypto.randomUUID()}
                className={`rounded text-xs ${statusColors[reservation.status]} flex h-[23px] items-center pl-1`}
              >
                {reservation.title}
              </div>
            ))}
        </div>
      </div>
    </button>
  );
}

export default Day;
