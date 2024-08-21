import { useActivityId } from "@/app/(home)/[activityId]/_contexts/ActivityIdContext";
import {
  getActivitySubImages,
  getActivityTitle,
  getActivityTotalImages,
} from "@/app/(home)/[activityId]/_utils/getActivityData";
import { activityIdOptions } from "@/app/(home)/[activityId]/queryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";

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
