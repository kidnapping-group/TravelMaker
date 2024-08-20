import useGetCommentReviewViewModel from "@/app/[activityId]/_hooks/useGetCommentReviewViewModel";
import Image from "next/image";

function ReviewDetail() {
  const { satisfies, totalCount, floorRating } = useGetCommentReviewViewModel();

  return (
    <div>
      <div className="border-#112211 mt-10 border-t" />
      <h1 className="mt-10 text-xl font-bold">후기</h1>
      <div className="mt-4 flex items-center gap-4">
        <p className="text-[50px] font-semibold">{floorRating}</p>
        <div className="flex flex-col justify-center gap-2">
          <p className="text-2lg font-normal">{satisfies}</p>
          <div className="flex gap-1">
            <Image src="icons/Icon_star_on.svg" alt="별" width={16} height={16} />
            <p>{totalCount}개 후기</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewDetail;
