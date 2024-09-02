import { useActivityId } from "@/app/(home)/[activityId]/_contexts/ActivityIdContext";
import {
  getCommentReview,
  getCommentTotalCount,
  getRatingToSatisfaction,
} from "@/app/(home)/[activityId]/_utils/getCommentData";
import { activityIdOptions, commentOptions } from "@/app/(home)/[activityId]/queryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";

const useGetCommentReviewViewModel = () => {
  const { activityId } = useActivityId();
  const { data } = useSuspenseQuery(commentOptions(activityId));
  const {
    data: { rating },
  } = useSuspenseQuery(activityIdOptions(activityId));

  return {
    satisfies: getRatingToSatisfaction(rating),
    totalCount: getCommentTotalCount(data),
    rating,
    reviews: getCommentReview(data),
  };
};

export default useGetCommentReviewViewModel;
