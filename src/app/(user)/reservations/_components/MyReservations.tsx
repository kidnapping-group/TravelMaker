"use client";

import { ReservationRes } from "@/apis/API.type";
import myReservationAPI from "@/apis/myReservationAPI";
import Dropdown from "@/components/Dropdown";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

import MyReservationItem from "./MyReservationItem";

function MyReservations() {
  let size = 10;
  const menuItems = ["전체보기", "예약 신청", "예약 취소", "예약 승인", "예약 거절", "체험 완료"];
  const menuItemsStatus = ["all", "pending", "confirmed", "declined", "canceled", "completed"];
  const [status, setStatus] = useState<string | undefined>(undefined);
  const { data, isLoading, error } = useInfiniteQuery<
    ReservationRes,
    Error,
    InfiniteData<ReservationRes>,
    [string, number, string | null],
    number | undefined
  >({
    queryKey: ["myReservations", size, status ?? null],
    queryFn: ({ pageParam }: { pageParam?: number }) =>
      myReservationAPI.get({ cursorId: pageParam, size, status: status || undefined }),
    initialPageParam: undefined,
    getNextPageParam: lastBatch => lastBatch.cursorId,
  });
  const handleSelectStatus = (selectStatus: string) => {
    const selectedIndex = menuItems.indexOf(selectStatus);
    const correspondingStatus = menuItemsStatus[selectedIndex] || "all";
    setStatus(correspondingStatus === "all" ? undefined : correspondingStatus);
  };

  const hasReservations = data?.pages.some(page => page.reservations.length > 0);

  if (isLoading)
    return (
      <div className="flex flex-col items-center gap-[100px] pt-[200px] text-3xl font-bold">
        <Image
          width={450}
          height={450}
          src="/images/spinner.png"
          alt="spinner"
          className="animate-[spin_1500ms_linear_infinite]"
        />
      </div>
    );

  if (error) return <div>에러가 발생했습니다.</div>;
  return (
    <div className="relative h-full w-full max-w-[800x] flex-col items-center justify-center px-4">
      <div className="z-10 flex w-full max-w-[768px] items-start justify-between bg-gray-100 pb-6">
        <h1 className="text-3xl font-bold">예약 내역</h1>
        <Dropdown
          menuItems={menuItems}
          type="round"
          onChangeDropdown={handleSelectStatus}
          placeHolder="필터"
        />
      </div>
      {hasReservations ? (
        <div className="h-full pb-20">
          <div className="h-full overflow-y-auto">
            {data?.pages.map(page => (
              <div className="flex flex-col gap-[24px]" key={crypto.randomUUID()}>
                {page.reservations.map(reservation => (
                  <MyReservationItem key={reservation.id} reservation={reservation} />
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center tablet:w-[800px]">
          <Image src="/images/empty.png" alt="빈 이미지" width={240} height={240} />
          <p className="text-2xl font-medium text-gray-500">아직 등록한 체험이 없어요</p>
        </div>
      )}
    </div>
  );
}

export default MyReservations;
