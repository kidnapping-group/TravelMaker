import { getDateClasses } from "@/app/[activityId]/_utils/createCalendar";

export interface CalendarDayProps {
  date: Date;
  formattedDate: string;
  isCurrentMonth: boolean;
  hasReservation: boolean;
  isSelected: boolean;
  setSelectedDate: (date: string) => void;
}

function CalendarDay({
  date,
  formattedDate,
  isCurrentMonth,
  hasReservation,
  isSelected,
  setSelectedDate,
}: CalendarDayProps) {
  return (
    <button
      type="button"
      className={getDateClasses(isCurrentMonth, hasReservation, isSelected)}
      onClick={() => hasReservation && setSelectedDate(formattedDate)}
    >
      {date.getDate()}
    </button>
  );
}

export default CalendarDay;
