import { useSuspenseQuery } from "@tanstack/react-query";

import { useActivityId } from "../_contexts/ActivityIdContext";
import {
  getActivityAddress,
  getActivityCategory,
  getActivityRating,
  getActivityReviewCount,
  getActivityTitle,
} from "../_utils/getActivityData";
import { activityIdOptions } from "../queryOptions";

const useGetActivityHeaderViewModel = () => {
  const { activityId } = useActivityId();
  const { data } = useSuspenseQuery(activityIdOptions(activityId));

  return {
    category: getActivityCategory(data),
    title: getActivityTitle(data),
    rating: getActivityRating(data),
    reviewCount: getActivityReviewCount(data),
    address: getActivityAddress(data),
    activityId,
  };
};

export default useGetActivityHeaderViewModel;
