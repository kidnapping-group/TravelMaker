// 윤년인지 확인하는 함수
const isLeapYear = (year: number): boolean =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

// 주어진 월의 첫 날짜 객체를 반환
const getFirstDayOfMonth = (year: number, month: number): Date => new Date(year, month - 1, 1);

// 주어진 월의 마지막 날짜 객체를 반환
export const getLastDayOfMonth = (year: number, month: number): Date => new Date(year, month, 0);

// 주어진 월의 총 일수를 반환
export const getDaysInMonth = (year: number, month: number): number => {
  if (month === 2) {
    // 2월일 경우 윤년 체크
    return isLeapYear(year) ? 29 : 28;
  }
  if ([4, 6, 9, 11].includes(month)) {
    // 4, 6, 9, 11월은 30일까지
    return 30;
  }
  // 나머지 월은 31일까지
  return 31;
};

// 주어진 날짜의 요일을 반환 (0: 일요일, 1: 월요일, ...)
const getDayOfWeek = (date: Date): number => date.getDay();

// 달력 그리드 배열 생성
export const getCalendarGrid = (year: number, month: number): number[][] => {
  const firstDay = getFirstDayOfMonth(year, month);
  const daysInMonth = getDaysInMonth(year, month);
  const startingDayOfWeek = getDayOfWeek(firstDay);

  const previousMonth = month === 1 ? 12 : month - 1;
  const previousMonthYear = month === 1 ? year - 1 : year;
  const daysInPreviousMonth = getDaysInMonth(previousMonthYear, previousMonth);

  const calendar: number[][] = [];
  let week: number[] = [];

  // 이전 달의 날짜 채우기 (음수로 표시)
  for (let i = 0; i < startingDayOfWeek; i += 1) {
    week.unshift(-(daysInPreviousMonth - i));
  }

  // 현재 달의 날짜 채우기
  for (let day = 1; day <= daysInMonth; day += 1) {
    week.push(day);
    if (week.length === 7) {
      calendar.push(week);
      week = [];
    }
  }

  // 다음 달의 날짜 채우기 (양수로 표시하되 현재 달의 날짜보다 큰 값으로)
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
