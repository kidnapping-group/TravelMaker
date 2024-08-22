import { Reservation } from "@/app/(user)/reservation-status/_components/ExistActivity/Calendar/Day";
import { getCalendarGrid, getDaysInMonth } from "@/app/(user)/reservation-status/utils/calendar";
import { useMemo } from "react";

// 나중에 목데이터 지워라
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

interface CalendarDayData {
  day: number;
  reservations: Reservation[];
  hasEvent: boolean;
  isCurrentMonth: boolean;
}

const useCreateCalendar = (currentYear: number, currentMonth: number): CalendarDayData[][] =>
  useMemo(
    () =>
      getCalendarGrid(currentYear, currentMonth).map(week =>
        week.map(day => ({
          day,
          reservations: mockReservations[Math.abs(day)] || [],
          hasEvent: !!mockReservations[Math.abs(day)],
          isCurrentMonth: day > 0 && day <= getDaysInMonth(currentYear, currentMonth),
        })),
      ),
    [currentYear, currentMonth],
  );

export default useCreateCalendar;
