import { useActivityId } from "@/app/[activityId]/_contexts/ActivityIdContext";
import {
  getActivityAddress,
  getActivityDescription,
} from "@/app/[activityId]/_utils/getActivityData";
import { activityIdOptions } from "@/app/[activityId]/queryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";

const useGetActivityContentsViewModel = () => {
  const { activityId } = useActivityId();
  const { data } = useSuspenseQuery(activityIdOptions(activityId));

  return {
    address: getActivityAddress(data),
    description: getActivityDescription(data),
  };
};

export default useGetActivityContentsViewModel;
