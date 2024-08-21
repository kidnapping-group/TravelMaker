"use client";

import Day, {
  Reservation,
} from "@/app/(user)/reservation-status/_components/ExistActivity/Calendar/Day";
import {
  getCalendarGrid,
  getDaysInMonth,
  getMonth,
  getYear,
} from "@/app/(user)/reservation-status/utils/calendar";
import Image from "next/image";
import { useState } from "react";

const weeks = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];

const mockReservations: Record<number, Reservation[]> = {
  9: [{ id: "1", status: "pending", title: "예약 1" }],
  10: [{ id: "2", status: "confirmed", title: "승인 5" }],
  11: [{ id: "3", status: "confirmed", title: "승인 2" }],
  12: [{ id: "4", status: "confirmed", title: "승인 5" }],
  16: [{ id: "5", status: "completed", title: "완료 10" }],
  17: [{ id: "6", status: "confirmed", title: "승인 5" }],
  18: [
    { id: "7", status: "confirmed", title: "승인 2" },
    { id: "8", status: "pending", title: "예약 8" },
    { id: "5", status: "completed", title: "완료 10" },
  ],
  19: [{ id: "9", status: "pending", title: "예약 10" }],
};

function Calendar({ selectedId }: { selectedId: number }) {
  const [selectedYear] = useState(getYear());
  const [selectedMonth, setSelectedMonth] = useState(getMonth());

  const daysInCurrentMonth = getDaysInMonth(selectedYear, selectedMonth);

  const calendarData = getCalendarGrid(selectedYear, selectedMonth).map(week =>
    week.map(day => ({
      day,
      reservations: mockReservations[Math.abs(day)] || [],
      hasEvent: !!mockReservations[Math.abs(day)],
      isCurrentMonth: day > 0 && day <= daysInCurrentMonth,
    })),
  );

  const handlePreviousMonth = () => {
    setSelectedMonth(prevMonth => (prevMonth === 1 ? 12 : prevMonth - 1));
  };

  const handleNextMonth = () => {
    setSelectedMonth(prevMonth => (prevMonth === 12 ? 1 : prevMonth + 1));
  };

  return (
    <div className="mx-auto mt-8 max-w-4xl">
      <div className="mb-4 flex items-center justify-center gap-24">
        <button type="button" onClick={handlePreviousMonth}>
          <Image src="/icons/left_double_arrow.svg" alt="이전 달" width={24} height={24} />
        </button>
        <h2 className="text-xl font-bold">{`${selectedYear}년 ${selectedMonth}월`}</h2>
        <button type="button" onClick={handleNextMonth}>
          <Image src="/icons/right_double_arrow.svg" alt="다음 달" width={24} height={24} />
        </button>
      </div>
      <div className="grid grid-cols-7">
        {weeks.map(week => (
          <div key={week} className="border bg-white p-2 text-center font-medium">
            {week}
          </div>
        ))}
        {calendarData.flat().map(dayData => (
          <Day key={crypto.randomUUID()} dayData={dayData} />
        ))}
      </div>
      <p>{selectedId}</p>
    </div>
  );
}
export default Calendar;
