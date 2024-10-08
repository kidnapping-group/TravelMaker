import { Reviews } from "@/apis/API.type";

import {
  getCommentReviewContent,
  getCommentReviewFormatUpdatedAt,
  getCommentReviewUserNickname,
  getCommentReviewUserProfileImg,
} from "../_utils/getCommentData";

const useGetCommentItemViewModel = (review: Reviews) => ({
  userProfileImg: getCommentReviewUserProfileImg(review),
  reviewUpdated: getCommentReviewFormatUpdatedAt(review),
  reviewContent: getCommentReviewContent(review),
  userNickname: getCommentReviewUserNickname(review),
});

export default useGetCommentItemViewModel;
