import { ActivityReview } from "@/apis/API.type";
import useGetCommentItemViewModel from "@/app/[activityId]/_hooks/useGetCommentItemViewModel";
import Image from "next/image";

interface CommentProps {
  review: ActivityReview;
  isShowBorder: boolean;
}

function Comment({ review, isShowBorder }: CommentProps) {
  const { reviewContent, reviewUpdated, userProfileImg, userNickname } =
    useGetCommentItemViewModel(review);
  return (
    <div className={`flex gap-4 py-6 ${isShowBorder && "border-b"}`}>
      <div className="relative h-[45px] w-[49px] overflow-hidden rounded-full">
        {userProfileImg && <Image src={userProfileImg} alt="유저 프로필 사진" fill />}
      </div>
      <div className="flex w-full flex-col gap-2">
        <div className="flex gap-2">
          <p>{userNickname}</p>
          <div className="border-#112211 border-r" />
          <p>{reviewUpdated}</p>
        </div>
        <p className="whitespace-normal break-words">{reviewContent}</p>
      </div>
    </div>
  );
}

export default Comment;
