import { getReservationMonthRes } from "@/apis/API.type";
import { DayData } from "@/app/(user)/reservation-status/_components/ExistActivity/Calendar/Day";
import ReservationMonthDataFormatted from "@/app/(user)/reservation-status/utils/ReservationMonthDataFormatted";
import { getCalendarGrid, getDaysInMonth } from "@/app/(user)/reservation-status/utils/calendar";
import { useMemo } from "react";

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
            isCompleted: data.some(item => item.reservations.completed > 0),
            isPending: data.some(item => item.reservations.pending > 0),
            isConfirmed: data.some(item => item.reservations.confirmed > 0),
          };
        }),
      ),
    [currentYear, currentMonth, data],
  );

export default useCreateCalendar;
