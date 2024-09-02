"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaEllipsisVertical, FaStar } from "react-icons/fa6";

import { Activities } from "@/apis/API.type";
import myActivitiesAPI from "@/apis/myActivitiesAPI";

import useImageError from "@/hooks/useImageError";

import Popup, { closePopup } from "@/components/Popup";

import ContextMenu from "./ContextMenu";

function MyActivityItem({ activity }: { activity: Activities }) {
  const [isOpen, setIsOpen] = useState(false);
  const [errorImage] = useImageError(["/images/noImage.png"]);

  const handleClickMore = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleDelete = async () => {
    await myActivitiesAPI.delete(activity.id);
  };

  return (
    <div className="relative">
      <div className="flex h-32 w-full overflow-hidden rounded-lg bg-white shadow-[0_6px_20px_rgba(0,0,0,0.15)] tablet:h-[150px] pc:h-[200px]">
        <div className="relative aspect-square h-32 w-32 overflow-hidden tablet:h-[150px] tablet:w-[150px] pc:h-[200px] pc:w-[200px]">
          <Link href={`/${activity.id}`}>
            <Image
              src={errorImage.src || activity.bannerImageUrl}
              fill
              alt="배너 이미지"
              onError={errorImage.onError}
              className="rounded-l-[24px] object-cover transition hover:scale-110"
            />
          </Link>
        </div>
        <div className="flex h-full flex-grow flex-col gap-[6px] px-6 py-[14px]">
          <div className="flex items-center gap-[6px]">
            <FaStar color="gold" />
            <p>{activity.rating}</p>
            <p>({activity.reviewCount})</p>
          </div>
          <div className="flex h-full flex-col justify-between">
            <h1 className="text-[18px] font-bold">{activity.title}</h1>
            <div className="flex justify-between">
              <div className="flex items-center gap-[10px] font-medium text-gray-600">
                <p className="text-2xl">₩{activity.price.toLocaleString()}</p>
                <p className="text-4">/인</p>
              </div>
              <button
                className="text-gray-700 transition-colors hover:text-gray-400"
                type="button"
                onClick={handleClickMore}
              >
                <FaEllipsisVertical />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Popup
        id="cancel"
        text="소중한 체험을 삭제하시겠습니까?"
        leftButton="아니요"
        onChangeLeftButton={() => closePopup("cancel")}
        rightButton="네"
        onChangeRightButton={handleDelete}
      />
      {isOpen && <ContextMenu activityId={activity.id} onCloseContext={() => setIsOpen(false)} />}
    </div>
  );
}

export default MyActivityItem;
