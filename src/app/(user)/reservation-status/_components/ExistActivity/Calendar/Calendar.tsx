"use client";

import Day, {
  Reservation,
} from "@/app/(user)/reservation-status/_components/ExistActivity/Calendar/Day";
import { getCalendarGrid, getMonth, getYear } from "@/app/(user)/reservation-status/utils/calendar";
import { useState } from "react";

const weeks = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];

const mockReservations: Record<number, Reservation[]> = {
  9: [{ id: "1", status: "pending", title: "예약 대기" }],
  10: [{ id: "2", status: "confirmed", title: "예약 5" }],
  11: [{ id: "3", status: "confirmed", title: "예약 2" }],
  12: [{ id: "4", status: "confirmed", title: "예약 5" }],
  16: [{ id: "5", status: "available", title: "잔여 10" }],
  17: [{ id: "6", status: "confirmed", title: "예약 5" }],
  18: [
    { id: "7", status: "confirmed", title: "예약 2" },
    { id: "8", status: "pending", title: "승인 8" },
  ],
  19: [{ id: "9", status: "pending", title: "승인 10" }],
};

function Calendar({ selectedId }: { selectedId: number }) {
  const [selectedYear] = useState(getYear());
  const [selectedMonth] = useState(getMonth());

  const calendarData = getCalendarGrid(selectedYear, selectedMonth).map(week =>
    week.map(day => ({
      day,
      reservations: mockReservations[Math.abs(day)] || [],
      hasEvent: !!mockReservations[Math.abs(day)],
    })),
  );

  return (
    <div className="mx-auto mt-10 max-w-4xl">
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold">{`${selectedYear}년 ${selectedMonth}월`}</h2>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {weeks.map(week => (
          <div key={week} className="p-2 text-center font-bold">
            {week}
            {selectedId}
          </div>
        ))}
        {calendarData.flat().map(dayData => (
          <Day
            key={crypto.randomUUID()}
            dayData={dayData}
            isCurrentMonth={dayData.day > 0 && dayData.day <= 31}
          />
        ))}
      </div>
    </div>
  );
}

export default Calendar;
