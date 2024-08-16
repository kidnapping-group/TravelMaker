"use client";

import Popup, { closePopup } from "@/components/Popup";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import myActivitiesAPI from "@/apis/myActivitiesAPI";
import { Activities } from "@/apis/API.type";
import ContextMenu from "./ContextMenu";

function MyActivityItem({ activity }: { activity: Activities }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickMore = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleDelete = async () => {
    await myActivitiesAPI.delete(activity.id);
  };

  return (
    <div className="relative">
      <div className="mx-auto flex h-32 w-full rounded-[24px] bg-white shadow-lg tablet:h-[156px] pc:h-[204px]">
        <div className="relative aspect-square h-32 w-32 tablet:h-[156px] tablet:w-[156px] pc:h-[204px] pc:w-[204px]">
          <Link href={`/${activity.id}`}>
            <Image
              src={activity.bannerImageUrl}
              fill
              alt="배너 이미지"
              className="rounded-l-[24px] object-cover"
            />
          </Link>
        </div>
        <div className="flex h-full flex-grow flex-col gap-[6px] px-6 py-[14px]">
          <div className="flex items-center gap-[6px]">
            <Image src="/icons/Icon_star_on.svg" width={19} height={19} alt="star" />
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
              <Image
                className="cursor-pointer"
                onClick={handleClickMore}
                src="/icons/Icon_moresee.svg"
                width={40}
                height={40}
                alt="수정삭제버튼"
              />
            </div>
          </div>
        </div>
      </div>
      <Popup
        id="cancel"
        text="예약을 취소하시겠어요?"
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