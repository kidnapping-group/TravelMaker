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

export const getDateClasses = (
  isCurrentMonth: boolean,
  hasReservation: boolean,
  isSelected: boolean,
) => {
  const baseClasses = "p-2 flex justify-center items-center font-semibold text-sm rounded-lg ";
  if (!isCurrentMonth) return `${baseClasses} text-gray-300`;
  if (isSelected) return `${baseClasses} text-white bg-primary-400`;
  if (hasReservation)
    return `${baseClasses} text-primary-400 bg-gray-200 hover:bg-primary-400 hover:text-white`;
  return `${baseClasses} hover:bg-gray-200`;
};
