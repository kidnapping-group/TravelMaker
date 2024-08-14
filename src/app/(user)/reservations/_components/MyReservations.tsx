"use client";

import { ReservationRes } from "@/apis/API.type";
import myReservationAPI from "@/apis/myReservationAPI";
import Dropdown from "@/components/Dropdown";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

import MyReservationItem from "./MyReservationItem";

function MyReservations() {
  const menuItems = ["all", "pending", "confirmed", "declined", "canceled", "completed"];
  const [status, setStatus] = useState<string | undefined>(undefined);

  const MyReservation = (size = 10) =>
    useInfiniteQuery<
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
  const { data, isLoading, error } = MyReservation();
  const handleSelectStatus = (selectStatus: string) => {
    if (selectStatus === "all") {
      setStatus(undefined);
    } else {
      setStatus(selectStatus);
    }
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
    <div className="relative mx-auto flex h-[100vh] w-full max-w-[806px] flex-col items-center justify-start px-4 pb-[210px]">
      <div className="z-10 flex h-20 w-full max-w-[800px] items-start justify-between bg-gray-100 pb-4 pt-2">
        <h1 className="text-3xl font-bold">예약 내역</h1>
        <Dropdown
          menuItems={menuItems}
          type="round"
          onChangeDropdown={handleSelectStatus}
          placeHolder="필터"
        />
      </div>
      {hasReservations ? (
        <div className="h-full w-full flex-grow">
          <div className="h-full">
            {data?.pages.map(page => (
              <div
                className="flex h-full flex-col gap-[24px] overflow-y-auto"
                key={crypto.randomUUID()}
              >
                {page.reservations.map(reservation => (
                  <MyReservationItem key={reservation.id} reservation={reservation} />
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-grow flex-col items-center justify-center">
          <Image src="/images/empty.png" alt="빈 이미지" width={240} height={240} />
          <p className="text-2xl font-medium text-gray-500">아직 예약한 체험이 없어요</p>
        </div>
      )}
    </div>
  );
}

export default MyReservations;
