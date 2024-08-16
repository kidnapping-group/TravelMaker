import { useActivityId } from "@/app/[activityId]/_contexts/ActivityIdContext";
import {
  getActivityPrice,
  getActivityReservationId,
  getActivityReservationTime,
  getActivitySchedules,
  getActivitySchedulesTime,
} from "@/app/[activityId]/_utils/getActivityData";
import { activityIdOptions } from "@/app/[activityId]/queryOptions";
import formatKoreanWon from "@/utils/formatKoreanWon";
import { useSuspenseQuery } from "@tanstack/react-query";

const useGetActivityReservationStepsViewModel = (
  selectedDate: string,
  selectedTime: string | null,
) => {
  const { activityId } = useActivityId();
  const { data } = useSuspenseQuery(activityIdOptions(activityId));
  const price = getActivityPrice(data);

  return {
    reservationTimes: getActivityReservationTime(data, selectedDate),
    reservationId: getActivityReservationId(data, selectedDate),
    scheduleTime: getActivitySchedulesTime(data, selectedTime),
    schedules: getActivitySchedules(data),
    price,
    totalPrice: formatKoreanWon(price),
  };
};

export default useGetActivityReservationStepsViewModel;
