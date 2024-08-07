"use client";

import Map from "@/app/[activityId]/_components/Map";
import { activityIdOptions } from "@/app/[activityId]/activityId";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

// 시도해보자!! 이번에 map으로 만들어서 어케 잘 조정해보자
function ActivityIdDetail({ activityId }: { activityId: string }) {
  const { data } = useSuspenseQuery(activityIdOptions(activityId));
  const [imageIndex, setImageIndex] = useState(0);
  const imageUrlArray = [data.bannerImageUrl, ...data.subImages.map(item => item.imageUrl)];

  return (
    <div>
      <p className="text- mt-4 text-md font-normal">{data.category}</p>
      <div className="mt-3 flex items-center justify-between text-2xl font-bold">
        <h1>{data.title}</h1>
        <Image src="/icons/icon-meatball.svg" alt="수정, 삭제 버튼보기" width={40} height={40} />
      </div>
      <div className="mt-4 flex items-center gap-3 text-md font-normal">
        <div className="flex items-center justify-center gap-1">
          <Image src="icons/Icon_star_on.svg" alt="평점" width={16} height={16} />
          <p>{data.rating}</p>
          <p>({data.reviewCount})</p>
        </div>
        <div className="flex items-center justify-center gap-1">
          <Image src="icons/icon-location.svg" alt="위치 아이콘" width={18} height={18} />
          <p>{data.address}</p>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative h-[310px] w-[375px]">
          <Image
            src={imageUrlArray[imageIndex]}
            alt={`${data.title} 배경 사진`}
            fill
            style={{
              objectFit: "cover",
            }}
          />
          <button
            type="button"
            onClick={() =>
              setImageIndex((imageIndex - 1 + imageUrlArray.length) % imageUrlArray.length)
            }
            className="absolute left-2.5 top-1/2 -translate-y-1/2 transform tablet:hidden"
          >
            <Image src="icons/icon-prev.svg" alt="이전 사진" width={24} height={47} />
          </button>
          <button
            type="button"
            onClick={() => setImageIndex((imageIndex + 1) % imageUrlArray.length)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 transform tablet:hidden"
          >
            <Image src="icons/icon-next.svg" alt="다음 사진" width={24} height={47} />
          </button>
        </div>
        <div className="hidden tablet:block">
          {data.subImages.map(item => (
            <Image
              key={item.id}
              src={item.imageUrl}
              alt={`${data.title} 서브 사진`}
              width={170}
              height={150}
            />
          ))}
        </div>
      </div>
      <div className="mt-4 flex flex-col justify-center gap-4">
        <div className="flex flex-col justify-center gap-4">
          <p className="text-xl font-bold">체험 설명</p>
          <p className="text-lg font-normal">{data.description}</p>
        </div>
        <div className="border-#112211 border" />
        <div>
          <Map address={data.address} />
          <div className="flex items-center gap-1">
            <Image src="icons/icon-location.svg" alt="위치 아이콘" width={18} height={18} />
            <p>{data.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityIdDetail;
