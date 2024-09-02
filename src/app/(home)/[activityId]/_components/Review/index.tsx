"use client";

import Pagination from "@/components/Pagination";

import useGetCommentReviewViewModel from "../../_hooks/useGetCommentReviewViewModel";
import CommentList from "./CommentList";
import ReviewDetail from "./ReviewDetail";

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
