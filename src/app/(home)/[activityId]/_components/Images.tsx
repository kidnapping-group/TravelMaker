"use client";

import useGetActivityImageViewModel from "@/app/(home)/[activityId]/_hooks/useGetActivityImagesViewModel";
import useImageError from "@/hooks/useImageError";
import Image from "next/image";
import { useState } from "react";

const showImage = [
  "hidden",
  "hidden tablet:grid tablet:grid-cols-1 tablet:grid-rows-1 tablet:gap-1 pc:gap-2",
  "hidden tablet:grid tablet:grid-cols-1 tablet:grid-rows-2 tablet:gap-1 pc:gap-2",
  "hidden tablet:grid tablet:grid-cols-2 tablet:grid-rows-2 tablet:gap-1 pc:gap-2",
  "hidden tablet:grid tablet:grid-cols-2 tablet:grid-rows-2 tablet:gap-1 pc:gap-2",
];

const getImageLayout = (imageCount: number, index: number) => {
  if (imageCount === 3) {
    return index === 0 ? "col-span-2 row-span-1" : "col-span-1 row-span-1";
  }
  return "h-full w-full";
};

function Images() {
  const { title, subImages, totalImages } = useGetActivityImageViewModel();
  const [errorImage] = useImageError(["/images/noImage.png"]);
  const [imageIndex, setImageIndex] = useState(0);

  const imageCount = Math.min(subImages.length, 4);
  const hasSubImages = subImages.length > 0;

  const mainImageClasses = hasSubImages
    ? "w-[595px] tablet:w-[345px] pc:w-[595px]"
    : "w-full tablet:w-full pc:w-full";

  return (
    <div className="-mx-6 flex w-full justify-center tablet:mx-auto tablet:justify-normal tablet:gap-1 pc:gap-2">
      <div className={`relative h-[310px] ${mainImageClasses} pc:h-[534px]`}>
        <Image
          src={errorImage.src || totalImages[imageIndex]}
          alt={`${title} 배경 사진`}
          fill
          style={{
            objectFit: "cover",
          }}
          onError={errorImage.onError}
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
      {hasSubImages && (
        <div className={`${showImage[imageCount]} h-[304px] w-[340px] pc:h-[528px] pc:w-[588px]`}>
          {subImages.map((item, index) => (
            <div key={item.id} className={`relative ${getImageLayout(imageCount, index)}`}>
              <Image
                src={errorImage.src || item.imageUrl}
                alt={`${title} 서브 사진`}
                fill
                style={{ objectFit: "cover" }}
                className="h-full w-full"
                onError={errorImage.onError}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Images;
