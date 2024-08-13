"use client";

import { Button } from "@/components/Button";
import Popup from "@/components/Popup";
import Image from "next/image";
import Link from "next/link";

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
    confirmed: "text-orange2",
  };

  const buttonStyle =
    "border border-nomad-black w-full h-[40px] flex items-center justify-center rounded-md text-[16px] py-[12px] px-[10px] m:h-[32px] m:text-[14px]";
  return (
    <div className="shadow-card t:h-[156px] m:h-[128px] relative flex h-[204px] overflow-hidden rounded-3xl bg-white dark:shadow-none">
      <div className="t:min-w-[156px] t:h-[156px] m:min-w-[110px] m:h-[128px] relative h-[204px] min-w-[204px] overflow-hidden">
        <Link
          href={`/activity-details/${reservation.activity.id}`}
          className="mt-[8px] text-[20px] font-bold hover:underline"
        >
          <Image
            src={reservation.activity.bannerImageUrl}
            alt="액티비티 사진"
            layout="fill"
            objectFit="cover"
            className="hover:scale-110"
          />
        </Link>
      </div>
      <div className="t:p-[12px] m:p-[9px] dark:bg-var-dark2 w-full p-[24px]">
        <p
          className={`text-[16px] font-bold ${statusStyle[reservation.status]} m:text-[14px] m:py-[2px]`}
        >
          {statusTitles[reservation.status]}
        </p>
        <Link href={`/activity-details/${reservation.activity.id}`}>
          <p className="t:text-[18px] t:mt-[0] t:w-[250px] t:overflow-hidden t:whitespace-nowrap t:text-ellipsis m:text-[14px] m:mt-[0] m:py-[2px] m:w-[200px] m:overflow-hidden m:whitespace-nowrap m:text-ellipsis mt-[8px] text-[20px] font-bold tracking-tight hover:underline">
            {reservation.activity.title}
          </p>
        </Link>
        <p className="t:text-[14px] t:mt-[5px] m:text-[12px] m:mt-[0] m:py-[2px] mt-[12px] text-[18px]">
          {reservation.date}&nbsp;&nbsp;·&nbsp;&nbsp;
          {reservation.startTime}~{reservation.endTime}
          &nbsp;&nbsp;·&nbsp;{reservation.headCount}명
        </p>
        <div className="t:mt-[11px] m:mt-[0] mt-[16px] flex h-[40px] w-full items-center justify-between">
          <p className="t:text-[20px] m:text-[16px] text-[24px] font-medium">
            ₩{reservation.totalPrice.toLocaleString()}
          </p>
          <div className="t:min-w-[112px] m:min-w-[80px] min-w-[144px]">
            {reservation.status === "pending" && (
              <Button
                className={`text-nomad-black bg-white ${buttonStyle}`}
                // onClick={handleCancelReservation}
              >
                예약 취소
              </Button>
            )}
            {reservation.status === "completed" && !reservation.reviewSubmitted && (
              <Button
                className={`bg-nomad-black text-white ${buttonStyle}`}
                // onClick={handleOpenReviewModal}
              >
                후기 작성
              </Button>
            )}
            {reservation.status === "completed" && reservation.reviewSubmitted && (
              <div className={`bg-var-gray6 text-white ${buttonStyle}`}>후기 작성 완료</div>
            )}
          </div>
        </div>
      </div>
      <Popup text="예약을 취소하시겠어요?" onCloseButton="아니요" onChangeButton="취소하기" />
    </div>
  );
}

export default MyReservationItem;
