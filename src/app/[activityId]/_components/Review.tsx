"use client";

import { reviewOptions } from "@/app/[activityId]/activityId";
import Pagination from "@/components/Pagination";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";

const ratingToSatisfaction = (rating: number): string => {
  const roundedRating = Math.round(rating);

  switch (roundedRating) {
    case 1:
      return "매우 불만족";
    case 2:
      return "불만족";
    case 3:
      return "보통";
    case 4:
      return "만족";
    case 5:
      return "매우 만족";
    default:
      return "평가 없음";
  }
};

function Review({ activityId }: { activityId: string }) {
  const { data } = useSuspenseQuery(reviewOptions(activityId));

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex w-full flex-col">
          <div className="border-#112211 mt-10 border-t" />
          <h1 className="mt-10 text-xl font-bold">후기</h1>
          <div className="mt-4 flex items-center gap-4">
            <p className="text-[50px] font-semibold">{Math.floor(data.averageRating * 10) / 10}</p>
            <div className="flex flex-col justify-center gap-2">
              <p className="text-2lg font-normal">{ratingToSatisfaction(data.averageRating)}</p>
              <div className="flex gap-1">
                <Image src="icons/icon_star_on.svg" alt="별" width={16} height={16} />
                <p>{data.reviews.length}개 후기</p>
              </div>
            </div>
          </div>
          <div>
            {data.reviews.map((item, index) => (
              <div key={item.id} className={`flex gap-4 py-6 ${index !== 2 && "border-b"}`}>
                <div className="relative h-[45px] w-[49px] overflow-hidden rounded-full">
                  {item.user.profileImageUrl && (
                    <Image src={item.user.profileImageUrl} alt="유저 프로필 사진" fill />
                  )}
                </div>
                <div className="flex w-full flex-col gap-2">
                  <div className="flex gap-2">
                    <p>{item.user.nickname}</p>
                    <div className="border-#112211 border-r" />
                    <p>{item.updatedAt}</p>
                  </div>
                  <p className="whitespace-normal break-words">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden h-auto tablet:block tablet:min-w-[252px] pc:min-w-[384px]" />
      </div>
      {data?.totalCount !== 0 && <Pagination totalCount={data?.totalCount} pageSize={3} />}
    </div>
  );
}

export default Review;
