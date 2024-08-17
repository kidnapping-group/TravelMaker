"use client";

import CommentList from "@/app/[activityId]/_components/Review/CommentList.tsx";
import ReviewDetail from "@/app/[activityId]/_components/Review/ReviewDetail";
import useGetCommentReviewViewModel from "@/app/[activityId]/_hooks/useGetCommentReviewViewModel";
import Pagination from "@/components/Pagination";

function Review() {
  const { totalCount } = useGetCommentReviewViewModel();

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <div className="flex w-full flex-col">
          <ReviewDetail />
          <CommentList />
        </div>
      </div>
      <div className="my-16">
        {totalCount > 3 && <Pagination totalCount={totalCount} pageSize={3} />}
      </div>
    </div>
  );
}

export default Review;
