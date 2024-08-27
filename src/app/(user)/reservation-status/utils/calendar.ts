const isLeapYear = (year: number): boolean =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

const getFirstDayOfMonth = (year: number, month: number): Date => new Date(year, month - 1, 1);

export const getLastDayOfMonth = (year: number, month: number): Date => new Date(year, month, 0);

export const getDaysInMonth = (year: number, month: number): number => {
  if (month === 2) {
    return isLeapYear(year) ? 29 : 28;
  }
  if ([4, 6, 9, 11].includes(month)) {
    return 30;
  }
  return 31;
};

const getDayOfWeek = (date: Date): number => date.getDay();

export const getCalendarGrid = (year: number, month: number): number[][] => {
  const firstDay = getFirstDayOfMonth(year, month);
  const daysInMonth = getDaysInMonth(year, month);
  const startingDayOfWeek = getDayOfWeek(firstDay);

  const previousMonth = month === 1 ? 12 : month - 1;
  const previousMonthYear = month === 1 ? year - 1 : year;
  const daysInPreviousMonth = getDaysInMonth(previousMonthYear, previousMonth);

  const calendar: number[][] = [];
  let week: number[] = [];

  for (let i = 0; i < startingDayOfWeek; i += 1) {
    week.unshift(-(daysInPreviousMonth - i));
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    week.push(day);
    if (week.length === 7) {
      calendar.push(week);
      week = [];
    }
  }

  let nextMonthDay = 1;
  if (week.length > 0) {
    while (week.length < 7) {
      week.push(-nextMonthDay);
      nextMonthDay += 1;
    }
    calendar.push(week);
  }

  return calendar;
};
