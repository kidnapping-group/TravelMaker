import { useActivityId } from "@/app/(home)/[activityId]/_contexts/ActivityIdContext";
import { getActivitySchedules, getActivityUserId } from "@/app/(home)/[activityId]/_utils/getActivityData";
import { getCookiesAccessToken, getCookiesUserID } from "@/app/(home)/[activityId]/_utils/getCookies";
import isReservationAvailable from "@/app/(home)/[activityId]/_utils/isReservationAvailable";
import { activityIdOptions } from "@/app/(home)/[activityId]/queryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";

const useControlPopup = () => {
  const { activityId } = useActivityId();
  const { data } = useSuspenseQuery(activityIdOptions(activityId));
  const schedules = getActivitySchedules(data);
  const activityUserId = getActivityUserId(data);
  const userId = getCookiesUserID();
  const accessToken = getCookiesAccessToken();

  return {
    isReservation: isReservationAvailable(schedules),
    isUser: activityUserId === userId,
    userId,
    accessToken,
    isLogin: accessToken && userId,
  };
};

export default useControlPopup;
