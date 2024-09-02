import { useSuspenseQuery } from "@tanstack/react-query";

import { useActivityId } from "../_contexts/ActivityIdContext";
import { getActivityAddress, getActivityDescription } from "../_utils/getActivityData";
import { activityIdOptions } from "../queryOptions";

const useGetActivityContentsViewModel = () => {
  const { activityId } = useActivityId();
  const { data } = useSuspenseQuery(activityIdOptions(activityId));

  return {
    address: getActivityAddress(data),
    description: getActivityDescription(data),
  };
};

export default useGetActivityContentsViewModel;
