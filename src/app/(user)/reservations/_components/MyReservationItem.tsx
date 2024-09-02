"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Reservations } from "@/apis/API.type";
import myReservationAPI from "@/apis/myReservationAPI";

import useImageError from "@/hooks/useImageError";
import useMediaQuery from "@/hooks/useMediaQuery";

import { Button } from "@/components/Button";
import Modal, { openModal } from "@/components/Modal";
import Popup, { closePopup, openPopup } from "@/components/Popup";

import Review from "./review/Review";

function MyReservationItem({
  reservation,
  statusTitle,
}: {
  reservation: Reservations;
  statusTitle: string;
}) {
  const [errorImage] = useImageError(["/images/noImage.png"]);
  const { isMobile, isTablet, isPc } = useMediaQuery();
  const [reservationState, setReservationState] = useState(reservation);

  let size: "small" | "medium" | "large" = "small";

  if (isMobile) {
    size = "small";
  }
  if (isTablet) {
    size = "medium";
  }
  if (isPc) {
    size = "large";
  }

  const status = {
    pending: { title: "예약 신청", style: "text-blue-500" },
    canceled: { title: "예약 취소", style: "text-gray-200" },
    declined: { title: "예약 거절", style: "text-red-500" },
    completed: { title: "체험 완료", style: "text-gray-400" },
    confirmed: { title: "예약 승인", style: "text-orange-500" },
    closed: { title: "마감 완료", style: "text-gray-500" },
  };

  const handleCancelReservation = async () => {
    await myReservationAPI.patch(reservation.id);
  };

  useEffect(() => {
    const currentTime = new Date();
    const reservationDate = new Date(`${reservation.date}T${reservation.startTime}`);
    if (currentTime > reservationDate && reservation.status === "pending") {
      setReservationState((prev: Reservations) => ({ ...prev, status: "closed" }));
    }
  }, [reservation]);

  if (statusTitle === "마감 완료" && reservationState.status !== "closed") {
    return null;
  }

  if (statusTitle === "예약 신청" && reservationState.status !== "pending") {
    return null;
  }

  return (
    <div className="relative">
      <div className="flex h-32 overflow-hidden rounded-lg bg-white shadow-[0_6px_20px_rgba(0,0,0,0.15)] tablet:h-[150px] pc:h-[200px]">
        <div className="relative h-32 w-32 overflow-hidden tablet:h-[156px] tablet:min-w-[156px] pc:h-[204px] pc:w-[204px]">
          <Link
            href={`/${reservation.activity.id}`}
            className="mt-[8px] text-[20px] font-bold hover:underline"
          >
            <Image
              src={errorImage.src || reservation.activity.bannerImageUrl}
              alt="액티비티 사진"
              fill
              objectFit="cover"
              className="transition hover:scale-110"
              onError={errorImage.onError}
            />
          </Link>
        </div>
        <div className="flex flex-grow flex-col py-[9px] pl-2 pr-[15px] tablet:py-[12px] tablet:pl-3 tablet:pr-[18px] pc:px-6 pc:py-[21px]">
          <p
            className={`text-md font-bold ${status[reservationState.status].style} py-[1px] pc:text-lg`}
          >
            {status[reservationState.status].title}
          </p>
          <Link href={`/${reservationState.activity.id}`}>
            <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap py-[1px] text-md font-bold hover:underline tablet:text-lg pc:py-2 pc:text-xl">
              {reservationState.activity.title}
            </p>
          </Link>
          <p className="pc:text-lgx py-[3px] text-xs tablet:text-md pc:py-1">
            {reservationState.date} · {reservationState.startTime}~{reservationState.endTime} ·{" "}
            {reservationState.headCount}명
          </p>
          <div className="flex h-8 w-full items-center justify-between tablet:mt-2 tablet:h-10 pc:mt-3 pc:h-[42px]">
            <p className="text-lg font-medium tablet:text-xl pc:text-2xl">
              ₩{reservationState.totalPrice.toLocaleString()}
            </p>
            {reservationState.status === "pending" && (
              <Button
                variant="outline"
                size={size}
                onClick={() => openPopup(`cancel-${reservationState.id}`)}
              >
                예약 취소
              </Button>
            )}
            {reservationState.status === "completed" && !reservationState.reviewSubmitted && (
              <>
                <Button size={size} onClick={() => openModal(`writeReview-${reservationState.id}`)}>
                  후기 작성
                </Button>
                <Modal title="후기 작성" id={`writeReview-${reservationState.id}`}>
                  <Review reservation={reservationState} />,
                </Modal>
              </>
            )}
            {reservationState.status === "completed" && reservationState.reviewSubmitted && (
              <div className="bg-var-gray6 text-white">후기 작성 완료</div>
            )}
          </div>
        </div>
        <Popup
          id={`cancel-${reservationState.id}`}
          text="예약을 취소 하시겠습니까?"
          leftButton="아니요"
          onChangeLeftButton={() => closePopup(`cancel-${reservationState.id}`)}
          rightButton="취소하기"
          onChangeRightButton={handleCancelReservation}
        />
      </div>
    </div>
  );
}

export default MyReservationItem;
