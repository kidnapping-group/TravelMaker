import { openModal } from "@/components/Modal";
import { Dispatch, SetStateAction } from "react";

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
  isCompleted: boolean;
}

interface DayProps {
  dayData: DayData;
  setCurrentDate: Dispatch<SetStateAction<Date>>;
}

const statusColors = {
  completed: "bg-gray-300 text-gray-800",
  pending: "bg-blue-500 text-white",
  confirmed: "bg-[#FFF4E8] text-[#FF7C1D]",
};

function Day({ dayData, setCurrentDate }: DayProps) {
  const changeCurrentDay = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(dayData.day);
      return newDate;
    });
  };

  const handleClick = () => {
    if (!dayData.hasEvent) return;
    changeCurrentDay();
    openModal();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!dayData.hasEvent || dayData?.isCompleted}
      className={`w-full text-left ${dayData.hasEvent && !dayData?.isCompleted ? "cursor-pointer" : "cursor-default"}`}
    >
      <div
        className={`flex h-32 flex-col justify-between border p-[2px] font-medium ${dayData.isCurrentMonth ? "bg-white" : "bg-gray-100"} ${dayData.isCurrentMonth && dayData.hasEvent && !dayData?.isCompleted ? "transition-colors duration-200 hover:bg-primary-400" : ""} `}
      >
        <div className="ml-2 mt-2 flex w-9 items-start gap-1">
          <span className={`${dayData.isCurrentMonth ? "" : "text-gray-300"} text-xl leading-6`}>
            {Math.abs(dayData.day)}
          </span>
          {dayData.hasEvent && (
            <div
              className={`h-2 w-2 rounded-full ${
                dayData.isCompleted ? "bg-gray-700" : "bg-primary-500"
              }`}
            />
          )}
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
