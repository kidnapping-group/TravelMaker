type ReservationStatus = "available" | "pending" | "confirmed" | "full";

export interface Reservation {
  id: string;
  status: ReservationStatus;
  title: string;
}

interface DayData {
  day: number;
  reservations: Reservation[];
  hasEvent: boolean;
}

interface DayCellProps {
  dayData: DayData;
  isCurrentMonth: boolean;
}

const statusColors = {
  available: "bg-green-500",
  pending: "bg-yellow-500",
  confirmed: "bg-blue-500",
  full: "bg-red-500",
};

function Day({ dayData, isCurrentMonth }: DayCellProps) {
  return (
    <div className={`border p-2 ${isCurrentMonth ? "bg-white" : "bg-gray-100"}`}>
      <div className="flex items-center justify-between">
        <span className={isCurrentMonth ? "font-bold" : "text-gray-500"}>
          {Math.abs(dayData.day)}
        </span>
        {dayData.hasEvent && <div className="h-2 w-2 rounded-full bg-blue-500" />}
      </div>
      <div className="mt-2">
        {dayData.reservations.map(reservation => (
          <div
            key={reservation.id}
            className={`my-1 rounded p-1 text-xs ${statusColors[reservation.status]}`}
          >
            {reservation.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Day;
