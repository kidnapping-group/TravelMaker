import { getDateClasses } from "@/app/[activityId]/_utils/createCalendar";

interface CalendarDayProps {
  date: Date;
  formattedDate: string;
  isCurrentMonth: boolean;
  hasReservation: boolean;
  isSelected: boolean;
  setSelectedDate: (date: string, hasReservation: boolean) => void;
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
      disabled={!hasReservation}
      className={getDateClasses(isCurrentMonth, hasReservation, isSelected)}
      onClick={() => setSelectedDate(formattedDate, hasReservation)}
    >
      {date.getDate()}
    </button>
  );
}

export default CalendarDay;
