import { Schedules } from "@/apis/API.type";

export const monthNames = [
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

export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getDaysArray = (currentDate: Date, scheduleData: Schedules[]) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const now = new Date(); // 현재 날짜와 시간을 가져옵니다.

  return Array.from({ length: 35 }, (_, i) => {
    const day = i - firstDay + 1;
    const dateForDay = new Date(year, month, day);
    const formattedDate = formatDate(dateForDay);
    return {
      formattedDate,
      date: dateForDay,
      isCurrentMonth: day > 0 && day <= lastDate,
      hasReservation: scheduleData.some(item => {
        if (item.date !== formattedDate) return false;

        const [hours, minutes] = item.startTime.split(":").map(Number);
        const reservationDateTime = new Date(dateForDay);
        reservationDateTime.setHours(hours, minutes, 0, 0);

        return reservationDateTime > now;
      }),
    };
  });
};
export const getDateClasses = (
  isCurrentMonth: boolean,
  hasReservation: boolean,
  isSelected: boolean,
) => {
  const baseClasses = "p-2 flex justify-center items-center font-semibold text-sm rounded-lg ";
  if (!isCurrentMonth) return `${baseClasses} text-gray-300`;
  if (isSelected) return `${baseClasses} text-white bg-primary-400`;
  if (hasReservation)
    return `${baseClasses} border border-primary-600 hover:bg-primary-400 hover:text-white`;
  return `${baseClasses} text-gray-300 `;
};
