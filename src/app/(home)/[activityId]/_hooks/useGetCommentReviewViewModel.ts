import { useSuspenseQuery } from "@tanstack/react-query";

import { useActivityId } from "../_contexts/ActivityIdContext";
import {
  getCommentReview,
  getCommentTotalCount,
  getRatingToSatisfaction,
} from "../_utils/getCommentData";
import { activityIdOptions, commentOptions } from "../queryOptions";

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
