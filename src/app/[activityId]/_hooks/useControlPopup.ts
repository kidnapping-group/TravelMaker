import { useActivityId } from "@/app/[activityId]/_contexts/ActivityIdContext";
import { getActivitySchedules, getActivityUserId } from "@/app/[activityId]/_utils/getActivityData";
import getCookiesUserID from "@/app/[activityId]/_utils/getCookiesUserId";
import isReservationAvailable from "@/app/[activityId]/_utils/isReservationAvailable";
import { activityIdOptions } from "@/app/[activityId]/queryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";

const useControlPopup = () => {
  const { activityId } = useActivityId();
  const { data } = useSuspenseQuery(activityIdOptions(activityId));
  const schedules = getActivitySchedules(data);
  const activityUserId = getActivityUserId(data);
  const userId = getCookiesUserID();

  return {
    isReservation: isReservationAvailable(schedules),
    isUser: activityUserId === userId,
    userId,
  };
};

export default useControlPopup;
