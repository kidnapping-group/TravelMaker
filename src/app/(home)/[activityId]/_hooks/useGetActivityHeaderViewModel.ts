import { useActivityId } from "@/app/(home)/[activityId]/_contexts/ActivityIdContext";
import {
  getActivityAddress,
  getActivityCategory,
  getActivityRating,
  getActivityReviewCount,
  getActivityTitle,
} from "@/app/(home)/[activityId]/_utils/getActivityData";
import { activityIdOptions } from "@/app/(home)/[activityId]/queryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";

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
