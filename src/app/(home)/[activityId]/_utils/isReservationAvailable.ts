import { Schedules } from "@/apis/API.type";

function isReservationAvailable(schedules: Schedules[]): boolean {
  if (schedules.length === 0) return false;

  const now = new Date();
  let latestDate = new Date(0);

  schedules.forEach(schedule => {
    const [year, month, day] = schedule.date.split("-").map(Number);
    const [hours, minutes] = schedule.startTime.split(":").map(Number);
    const scheduleDate = new Date(year, month - 1, day, hours, minutes);
    if (scheduleDate > latestDate) {
      latestDate = scheduleDate;
    }
  });

  return now > latestDate;
}

export default isReservationAvailable;
