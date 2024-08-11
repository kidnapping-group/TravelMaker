import { ActivityReview, getActivitiesReviewsRes } from "@/apis/API.type";

const satisfactionRatings: { [key: number]: string } = {
  1: "매우 불만족",
  2: "불만족",
  3: "보통",
  4: "만족",
  5: "매우 만족",
};

export const getRatingToSatisfaction = (rating: number): string => {
  const roundedRating = Math.round(rating);
  return satisfactionRatings[roundedRating] || "평가 없음";
};

export const getCommentTotalCount = (data: getActivitiesReviewsRes) => {
  if (!data?.totalCount) return 0;
  return data?.totalCount;
};

export const getFloorAverageRating = (rating: number) => Math.floor(rating * 10) / 10;

export const getCommentReview = (data: getActivitiesReviewsRes) => {
  if (!data?.reviews) return [];
  return data?.reviews;
};

export const getCommentAverageRating = (data: getActivitiesReviewsRes) => {
  if (!data?.averageRating) return 0;
  return data?.averageRating;
};

export const getCommentReviewUserProfileImg = (data: ActivityReview) => {
  if (!data?.user?.profileImageUrl) return "";
  return data?.user?.profileImageUrl;
};

export const getCommentReviewUserNickname = (data: ActivityReview) => {
  if (!data?.user?.nickname) return "";
  return data?.user?.nickname;
};

export const getCommentReviewUpdatedAt = (data: ActivityReview) => {
  if (!data?.updatedAt) return "";
  return data?.updatedAt;
};

export const getCommentReviewFormatUpdatedAt = (data: ActivityReview) => {
  const updated = getCommentReviewUpdatedAt(data);
  const reviewUpdated = updated.slice(0, 10).split("-").join(".");

  return reviewUpdated;
};

export const getCommentReviewContent = (data: ActivityReview) => {
  if (!data?.content) return "";
  return data?.content;
};
