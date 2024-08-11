import Comment from "@/app/[activityId]/_components/Review/CommentList.tsx/Comment";
import useGetCommentReviewViewModel from "@/app/[activityId]/_hooks/useGetCommentReviewViewModel";

function CommentList() {
  const { reviews } = useGetCommentReviewViewModel();

  return (
    <div>
      {reviews.map((review, index) => {
        const isShowBorder = index !== 2;
        return <Comment review={review} key={review.id} isShowBorder={isShowBorder} />;
      })}
    </div>
  );
}

export default CommentList;
