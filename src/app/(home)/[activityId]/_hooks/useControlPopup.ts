import { useSuspenseQuery } from "@tanstack/react-query";

import { useActivityId } from "../_contexts/ActivityIdContext";
import { getActivitySchedules, getActivityUserId } from "../_utils/getActivityData";
import { getCookiesAccessToken, getCookiesUserID } from "../_utils/getCookies";
import isReservationAvailable from "../_utils/isReservationAvailable";
import { activityIdOptions } from "../queryOptions";

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
