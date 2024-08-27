"use client";

import DateSwitcher from "@/app/(user)/reservation-status/_components/ExistActivity/Calendar/DateSwitcher";
import Day from "@/app/(user)/reservation-status/_components/ExistActivity/Calendar/Day";
import ReservationStatusModal from "@/app/(user)/reservation-status/_components/ExistActivity/Calendar/ReservationStatusModal";
import useCreateCalendar from "@/app/(user)/reservation-status/hooks/useCreateCalendar";
import { getMyActivityMonthReservationStatus } from "@/app/(user)/reservation-status/utils/reservationStatus";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";

const weeks = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];

function Calendar({ selectedId }: { selectedId: number }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const monthReservationParams = {
    activityId: selectedId,
    year: String(currentYear),
    month: String(currentMonth < 10 ? `0${currentMonth}` : currentMonth),
  };

  const { data } = useSuspenseQuery(getMyActivityMonthReservationStatus(monthReservationParams));
  const calendarData = useCreateCalendar(currentYear, currentMonth, data);

  return (
    <div className="mx-auto mt-8 max-w-4xl">
      <DateSwitcher
        setCurrentDate={setCurrentDate}
        currentYear={currentYear}
        currentMonth={currentMonth}
      />
      <div className="grid grid-cols-7">
        {weeks.map(week => (
          <div key={week} className="border bg-white p-2 text-center font-medium">
            {week}
          </div>
        ))}
        {calendarData.flat().map(dayData => (
          <Day key={crypto.randomUUID()} dayData={dayData} setCurrentDate={setCurrentDate} />
        ))}
      </div>
      <ReservationStatusModal activityId={selectedId} selectedDate={currentDate} />
    </div>
  );
}
export default Calendar;
