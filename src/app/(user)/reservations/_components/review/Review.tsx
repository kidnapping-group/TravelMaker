import { Reservations } from "@/apis/API.type";
import myReservationAPI from "@/apis/myReservationAPI";
import { Button } from "@/components/Button";
import Image from "next/image";
import { useState } from "react";

import Rating from "./Rating";

function Review({ reservation }: { reservation: Reservations }) {
  const [reviewContent, setReviewContent] = useState<string>("");
  const [rating, setRating] = useState<number>(1);

  const handleReviewSubmit = async () => {
    await myReservationAPI.postReviews(reservation.id, { rating, content: reviewContent });
  };
  return (
    <div className="flex h-full w-[100vw] flex-col gap-3 px-4 tablet:h-[636px] tablet:w-[460px] tablet:gap-6 tablet:px-6">
      <div className="flex h-[100px] items-center gap-2 tablet:h-[137px]">
        <Image
          src={reservation.activity.bannerImageUrl}
          width={100}
          height={100}
          alt="체험 사진"
          className="flex-shrink-0 rounded-[12px] object-cover tablet:h-[125px] tablet:w-[125px]"
        />
        <div className="flex flex-grow flex-col justify-between truncate tablet:gap-3">
          <div className="flex flex-col tablet:gap-3">
            <p className="truncate text-lg font-bold tracking-tight tablet:text-xl">
              {reservation.activity.title}
            </p>
            <p className="tablet::text-2lg truncate text-md">
              {reservation.date} · {reservation.startTime} - {reservation.endTime} ·{" "}
              {reservation.headCount}명
            </p>
          </div>
          <div className="border-gary-200 border-t border-solid" />
          <p className="text-xl font-bold tablet:text-3xl">
            ₩{reservation.totalPrice.toLocaleString()}
          </p>
        </div>
      </div>
      <Rating onRatingChange={rate => setRating(rate)} currentRating={rating} />
      <div className="border-gary-200 flex h-[40vh] w-full flex-col rounded border border-solid p-4 tablet:h-[240px]">
        <textarea
          className="text-base scrollbar-hide h-full min-h-[150px] w-full flex-grow resize-none outline-none"
          placeholder="후기를 작성해 주세요."
          value={reviewContent}
          onChange={e => setReviewContent(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <Button size="wide" onClick={handleReviewSubmit}>
          작성하기
        </Button>
      </div>
    </div>
  );
}

export default Review;
