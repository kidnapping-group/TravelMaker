"use client";

import { FaStar } from "react-icons/fa6";

import Picture from "@/components/Picture";

interface ActivityCardProps {
  wide?: boolean;
  bannerImageUrl: string;
  title: string;
  price: number;
  rating: number;
  reviewCount: number;
}

function ActivityCard({
  wide = false,
  bannerImageUrl,
  title,
  price,
  rating,
  reviewCount,
}: ActivityCardProps) {
  return (
    <article
      className={`${wide ? "w-full" : "w-[288px] pc:w-full"} relative flex flex-col gap-4 pb-2`}
    >
      <div className="group relative aspect-video w-full overflow-hidden rounded-[10px]">
        <Picture className="object-cover" src={bannerImageUrl} alt="체험 사진" fill />
        <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-20" />
      </div>
      <div className="mx-1 flex flex-col gap-1">
        <div className="flex items-center gap-1 text-xs font-semibold">
          <FaStar color="gold" />
          <p>{rating.toFixed(1)}</p>
          <p className="text-gray-400">({reviewCount})</p>
        </div>
        <h3 className="line-clamp-1 text-lg font-bold">{title}</h3>
        <p className="text-md font-medium text-gray-500">
          <strong className="font-bold text-black">₩ {price.toLocaleString()}</strong> / 인
        </p>
      </div>
    </article>
  );
}

export default ActivityCard;
