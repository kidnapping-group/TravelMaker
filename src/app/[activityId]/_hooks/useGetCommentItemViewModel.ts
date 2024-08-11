import { ActivityReview } from "@/apis/API.type";
import {
  getCommentReviewContent,
  getCommentReviewFormatUpdatedAt,
  getCommentReviewUserNickname,
  getCommentReviewUserProfileImg,
} from "@/app/[activityId]/_utils/getCommentData";

const useGetCommentItemViewModel = (review: ActivityReview) => ({
  userProfileImg: getCommentReviewUserProfileImg(review),
  reviewUpdated: getCommentReviewFormatUpdatedAt(review),
  reviewContent: getCommentReviewContent(review),
  userNickname: getCommentReviewUserNickname(review),
});

export default useGetCommentItemViewModel;
