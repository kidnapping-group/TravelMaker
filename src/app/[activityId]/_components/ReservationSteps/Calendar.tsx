"use client";

import React, { useState } from "react";

interface ScheduleItem {
  endTime: string;
  startTime: string;
  date: string;
  id: number;
}

interface CalendarProps {
  scheduleData: ScheduleItem[];
  setSelectedDate: (date: string) => void;
}
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function Calendar({ scheduleData, setSelectedDate }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getDaysArray = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: 35 }, (_, i) => {
      const day = i - firstDay + 1;
      const dateForDay = new Date(year, month, day);
      const formattedDate = formatDate(dateForDay);
      return {
        formattedDate,
        date: dateForDay,
        isCurrentMonth: day > 0 && day <= lastDate,
        hasReservation: scheduleData.some(item => item.date === formattedDate),
      };
    });
  };

  const changeMonth = (increment: number) =>
    setCurrentDate(date => new Date(date.getFullYear(), date.getMonth() + increment, 1));

  const getDateClasses = (isCurrentMonth: boolean, hasReservation: boolean) => {
    const baseClasses = "p-2 flex justify-center items-center font-semibold text-sm rounded-lg ";
    if (!isCurrentMonth) return `${baseClasses} text-gray-300`;
    if (hasReservation)
      return `${baseClasses} text-primary-400 bg-gray-200 hover:bg-primary-400 hover:text-gray-700`;
    return `${baseClasses} hover:bg-primary-400`;
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
        {getDaysArray(currentDate).map(
          ({ formattedDate, date, isCurrentMonth, hasReservation }) => (
            <button
              type="button"
              key={date.toISOString()}
              className={getDateClasses(isCurrentMonth, hasReservation)}
              onClick={() => hasReservation && setSelectedDate(formattedDate)}
            >
              {date.getDate()}
            </button>
          ),
        )}
      </div>
    </div>
  );
}

export default Calendar;
