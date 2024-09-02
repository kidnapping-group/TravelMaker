import { useSuspenseQuery } from "@tanstack/react-query";

import formatKoreanWon from "@/utils/formatKoreanWon";

import { useActivityId } from "../_contexts/ActivityIdContext";
import {
  getActivityPrice,
  getActivityReservationTime,
  getActivitySchedules,
  getActivitySchedulesTime,
} from "../_utils/getActivityData";
import { activityIdOptions } from "../queryOptions";

const useGetActivityReservationStepsViewModel = (
  selectedDate: string,
  selectedTime: string | null,
) => {
  const { activityId } = useActivityId();
  const { data } = useSuspenseQuery(activityIdOptions(activityId));
  const price = getActivityPrice(data);

  return {
    reservationTimes: getActivityReservationTime(data, selectedDate),
    scheduleTime: getActivitySchedulesTime(data, selectedTime),
    schedules: getActivitySchedules(data),
    price,
    totalPrice: formatKoreanWon(price),
  };
};

export default useGetActivityReservationStepsViewModel;
