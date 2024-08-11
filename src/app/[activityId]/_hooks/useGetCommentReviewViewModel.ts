import { useActivityId } from "@/app/[activityId]/_contexts/ActivityIdContext";
import {
  getCommentAverageRating,
  getCommentReview,
  getCommentTotalCount,
  getFloorAverageRating,
  getRatingToSatisfaction,
} from "@/app/[activityId]/_utils/getCommentData";
import { commentOptions } from "@/app/[activityId]/activityId";
import { useSuspenseQuery } from "@tanstack/react-query";

const useGetCommentReviewViewModel = () => {
  const { activityId } = useActivityId();
  const { data } = useSuspenseQuery(commentOptions(activityId));
  const rating = getCommentAverageRating(data);

  return {
    satisfies: getRatingToSatisfaction(rating),
    totalCount: getCommentTotalCount(data),
    floorRating: getFloorAverageRating(rating),
    reviews: getCommentReview(data),
  };
};

export default useGetCommentReviewViewModel;
