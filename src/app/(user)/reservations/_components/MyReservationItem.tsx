"use client";

import myReservationAPI from "@/apis/myReservationAPI";
import { Button } from "@/components/Button";
import Popup, { closePopup, openPopup } from "@/components/Popup";
import Image from "next/image";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";

interface reservation {
  id: number;
  teamId: string;
  userId: number;
  activity: {
    bannerImageUrl: string;
    title: string;
    id: number;
  };
  scheduleId: number;
  status: "pending" | "confirmed" | "declined" | "canceled" | "completed";
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

function MyReservationItem({ reservation }: { reservation: reservation }) {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1199 });

  let size: "small" | "medium" | "large";

  switch (true) {
    case isMobile:
      size = "small";
      break;
    case isTablet:
      size = "medium";
      break;
    default:
      size = "large";
      break;
  }

  const statusTitles = {
    pending: "예약 신청",
    canceled: "예약 취소",
    declined: "예약 거절",
    completed: "체험 완료",
    confirmed: "예약 승인",
  };

  const statusStyle = {
    pending: "text-blue-500",
    canceled: "text-gray-200",
    declined: "text-red-500",
    completed: "text-gray-400",
    confirmed: "text-orange-500",
  };
  const handleCancelReservation = async () => {
    await myReservationAPI.patch(reservation.id);
  };

  return (
    <div className="relative">
      <div className="relative flex h-32 overflow-hidden rounded-3xl bg-white tablet:h-[156px] pc:h-[204px]">
        <div className="relative h-32 w-32 overflow-hidden tablet:h-[156px] tablet:min-w-[156px] pc:h-[204px] pc:w-[204px]">
          <Link
            href={`/${reservation.activity.id}`}
            className="mt-[8px] text-[20px] font-bold hover:underline"
          >
            <Image
              src={reservation.activity.bannerImageUrl}
              alt="액티비티 사진"
              fill
              objectFit="cover"
              className="hover:scale-110"
            />
          </Link>
        </div>
        <div className="flex flex-grow flex-col py-[9px] pl-2 pr-[15px] tablet:py-[12px] tablet:pl-3 tablet:pr-[18px] pc:px-6 pc:py-[21px]">
          <p className={`text-md font-bold ${statusStyle[reservation.status]} py-[1px] pc:text-lg`}>
            {statusTitles[reservation.status]}
          </p>
          <Link href={`/${reservation.activity.id}`}>
            <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap py-[1px] text-md font-bold hover:underline tablet:text-lg pc:py-2 pc:text-xl">
              {reservation.activity.title}
            </p>
          </Link>
          <p className="pc:text-lgx py-[3px] text-xs tablet:text-md pc:py-1">
            {reservation.date} · {reservation.startTime}~{reservation.endTime} ·{" "}
            {reservation.headCount}명
          </p>
          <div className="flex h-8 w-full items-center justify-between tablet:mt-2 tablet:h-10 pc:mt-3 pc:h-[42px]">
            <p className="text-lg font-medium tablet:text-xl pc:text-2xl">
              ₩{reservation.totalPrice.toLocaleString()}
            </p>
            {reservation.status === "pending" && (
              <Button
                variant="outline"
                size={size}
                onClick={() => openPopup(`cancel-${reservation.id}`)}
              >
                예약 취소
              </Button>
            )}
            {reservation.status === "completed" && !reservation.reviewSubmitted && (
              <Button
                size={size}
                //  onClick={handleOpenReviewModal}
              >
                후기 작성
              </Button>
            )}
            {reservation.status === "completed" && reservation.reviewSubmitted && (
              <div className="bg-var-gray6 text-white">후기 작성 완료</div>
            )}
          </div>
        </div>
        <Popup
          id={`cancel-${reservation.id}`}
          text="예약을 취소하겠어요?"
          leftButton="취소하기"
          onChangeLeftButton={handleCancelReservation}
          rightButton="아니요"
          onChangeRightButton={() => closePopup(`cancel-${reservation.id}`)}
        />
      </div>
    </div>
  );
}

export default MyReservationItem;
