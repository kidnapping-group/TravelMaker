import { FaStar } from "react-icons/fa6";

import useGetCommentReviewViewModel from "../../_hooks/useGetCommentReviewViewModel";

function ReviewDetail() {
  const { satisfies, totalCount, rating } = useGetCommentReviewViewModel();

  return (
    <div>
      <div className="border-#112211 mt-10 border-t" />
      <h1 className="mt-10 text-xl font-bold">후기</h1>
      <div className="mt-4 flex items-center gap-4">
        <p className="text-[50px] font-semibold">{rating}</p>
        <div className="flex flex-col justify-center gap-2">
          <p className="text-2lg font-normal">{satisfies}</p>
          <div className="flex items-center gap-2">
            <FaStar color="gold" />
            <p>{totalCount}개 후기</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewDetail;
