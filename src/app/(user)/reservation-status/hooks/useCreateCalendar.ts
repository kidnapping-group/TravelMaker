import { useMemo } from "react";

import { getReservationMonthRes } from "@/apis/API.type";

import { DayData } from "../_components/ExistActivity/Calendar/Day";
import ReservationMonthDataFormatted from "../utils/ReservationMonthDataFormatted";
import { getCalendarGrid, getDaysInMonth } from "../utils/calendar";

const useCreateCalendar = (
  currentYear: number,
  currentMonth: number,
  data: getReservationMonthRes[],
): DayData[][] =>
  useMemo(
    () =>
      getCalendarGrid(currentYear, currentMonth).map(week =>
        week.map(day => {
          const isCurrentMonth = day > 0 && day <= getDaysInMonth(currentYear, currentMonth);
          return {
            day,
            isCurrentMonth,
            reservations: ReservationMonthDataFormatted(data)[Math.abs(day)] || [],
            hasEvent:
              !!ReservationMonthDataFormatted(data)[Math.abs(day)]?.length && isCurrentMonth,
          };
        }),
      ),
    [currentYear, currentMonth, data],
  );

export default useCreateCalendar;
