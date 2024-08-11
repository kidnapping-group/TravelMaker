import { useActivityId } from "@/app/[activityId]/_contexts/ActivityIdContext";
import {
  getActivityPrice,
  getActivityReservationId,
  getActivityReservationTime,
  getActivitySchedules,
} from "@/app/[activityId]/_utils/getActivityData";
import { activityIdOptions } from "@/app/[activityId]/activityId";
import formatKoreanWon from "@/utils/formatKoreanWon";
import { useSuspenseQuery } from "@tanstack/react-query";

const useGetActivityReservationStepsViewModel = (selectedDate: string) => {
  const { activityId } = useActivityId();
  const { data } = useSuspenseQuery(activityIdOptions(activityId));
  const price = getActivityPrice(data);

  return {
    reservationTimes: getActivityReservationTime(data, selectedDate),
    reservationId: getActivityReservationId(data, selectedDate),
    schedules: getActivitySchedules(data),
    price,
    totalPrice: formatKoreanWon(price),
  };
};

export default useGetActivityReservationStepsViewModel;
