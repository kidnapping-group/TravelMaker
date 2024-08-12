"use client";

import useGetActivityImageViewModel from "@/app/[activityId]/_hooks/useGetActivityImagesViewModel";
import Image from "next/image";
import { useState } from "react";

function Images() {
  const { title, subImages, totalImages } = useGetActivityImageViewModel();
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <div className="-mx-6 flex justify-center tablet:mx-auto tablet:justify-normal tablet:gap-1 pc:gap-2">
      <div className="relative h-[310px] w-[595px] tablet:w-[345px] pc:h-[534px] pc:w-[595px]">
        <Image
          src={totalImages[imageIndex]}
          alt={`${title} 배경 사진`}
          fill
          style={{
            objectFit: "cover",
          }}
        />
        <button
          type="button"
          onClick={() => setImageIndex((imageIndex - 1 + totalImages.length) % totalImages.length)}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 transform tablet:hidden"
        >
          <Image src="icons/icon-prev.svg" alt="이전 사진" width={24} height={47} />
        </button>
        <button
          type="button"
          onClick={() => setImageIndex((imageIndex + 1) % totalImages.length)}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 transform tablet:hidden"
        >
          <Image src="icons/icon-next.svg" alt="다음 사진" width={24} height={47} />
        </button>
      </div>
      <div className="hidden tablet:grid tablet:grid-cols-2 tablet:grid-rows-2 tablet:gap-1 pc:gap-2">
        {subImages.map(item => (
          <div key={item.id} className="relative h-[152px] w-[170px] pc:h-[264px] pc:w-[294px]">
            <Image
              src={item.imageUrl}
              alt={`${title} 서브 사진`}
              fill
              style={{
                objectFit: "cover",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Images;
