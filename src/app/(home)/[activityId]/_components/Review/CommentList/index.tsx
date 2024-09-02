import useGetCommentReviewViewModel from "../../../_hooks/useGetCommentReviewViewModel";
import Comment from "./Comment";

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
