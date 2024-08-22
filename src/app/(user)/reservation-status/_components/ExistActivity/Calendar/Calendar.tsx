"use client";

import DateSwitcher from "@/app/(user)/reservation-status/_components/ExistActivity/Calendar/DateSwitcher";
import Day from "@/app/(user)/reservation-status/_components/ExistActivity/Calendar/Day";
import useCreateCalendar from "@/app/(user)/reservation-status/hooks/useCreateCalendar";
import { useState } from "react";

const weeks = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];

function Calendar({ selectedId }: { selectedId: number }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const calendarData = useCreateCalendar(currentYear, currentMonth);

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
          <Day key={crypto.randomUUID()} dayData={dayData} />
        ))}
      </div>
      <p>{selectedId}</p>
    </div>
  );
}
export default Calendar;
