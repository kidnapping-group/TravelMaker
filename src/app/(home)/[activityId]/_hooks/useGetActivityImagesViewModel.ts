import { useSuspenseQuery } from "@tanstack/react-query";

import { useActivityId } from "../_contexts/ActivityIdContext";
import {
  getActivitySubImages,
  getActivityTitle,
  getActivityTotalImages,
} from "../_utils/getActivityData";
import { activityIdOptions } from "../queryOptions";

const useGetActivityImageViewModel = () => {
  const { activityId } = useActivityId();
  const { data } = useSuspenseQuery(activityIdOptions(activityId));

  return {
    title: getActivityTitle(data),
    subImages: getActivitySubImages(data),
    totalImages: getActivityTotalImages(data),
  };
};

export default useGetActivityImageViewModel;
