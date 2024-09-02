"use client";

import { useState } from "react";

import { Schedules } from "@/apis/API.type";

import { getDaysArray, monthNames } from "../../../_utils/createCalendar";
import CalendarDay from "./CalendarDay";

interface CalendarProps {
  scheduleData: Schedules[];
  setSelectedDate: (date: string, hasReservation: boolean) => void;
}

function Calendar({ scheduleData, setSelectedDate }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const changeMonth = (increment: number) => {
    setCurrentDate(date => new Date(date.getFullYear(), date.getMonth() + increment, 1));
  };

  const handleDateSelection = (formattedDate: string, hasReservation: boolean) => {
    setSelectedDay(hasReservation ? formattedDate : null);
    setSelectedDate(formattedDate, hasReservation);
  };

  return (
    <div className="mx-auto mt-4 w-80 overflow-hidden rounded-lg border">
      <div className="flex items-center justify-between px-4 pt-2">
        <button type="button" onClick={() => changeMonth(-1)}>
          &laquo;
        </button>
        <p className="text-md font-bold">{`${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}</p>
        <button type="button" onClick={() => changeMonth(1)}>
          &raquo;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-[1px] px-7">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => (
          <p
            key={day}
            className="flex items-center justify-center p-2 text-md font-bold text-gray-700"
          >
            {day}
          </p>
        ))}
        {getDaysArray(currentDate, scheduleData).map(
          ({ formattedDate, date, isCurrentMonth, hasReservation }) => (
            <CalendarDay
              key={date.toISOString()}
              date={date}
              formattedDate={formattedDate}
              isCurrentMonth={isCurrentMonth}
              hasReservation={hasReservation}
              isSelected={formattedDate === selectedDay}
              setSelectedDate={handleDateSelection}
            />
          ),
        )}
      </div>
    </div>
  );
}

export default Calendar;
