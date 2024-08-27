"use client";

import { ReservationRes } from "@/apis/API.type";
import myReservationAPI from "@/apis/myReservationAPI";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useCallback, useState } from "react";

import MyReservationItem from "./MyReservationItem";
import StatusDropdown from "./StatusDropdown";

function MyReservations() {
  let size = 10;
  const [status, setStatus] = useState<string | undefined>();
  const [statusTitle, setStatusTitle] = useState<string | undefined>();

  const { data, isLoading, error, fetchNextPage, hasNextPage } = useInfiniteQuery<
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

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 1 && hasNextPage && !isLoading) {
      fetchNextPage();
    }
  };

  const handleDropdownSelect = useCallback(
    (dropdownStatus: string | undefined, dropdownStatusTitle: string) => {
      setStatus(dropdownStatus);
      setStatusTitle(dropdownStatusTitle);
    },
    [],
  );

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
    <div className="relative h-[100vh] w-full max-w-[806px] px-4 pb-[140px]">
      <div className="relative z-10 flex w-full max-w-[800px] items-start justify-between bg-gray-100 pb-4 pt-2">
        <h1 className="text-3xl font-bold">예약 내역</h1>
        <StatusDropdown placeholder={statusTitle} onSelect={handleDropdownSelect} />
      </div>

      {hasReservations ? (
        <div className="h-full pb-20">
          <div className="flex h-full flex-col gap-[24px] overflow-y-auto" onScroll={handleScroll}>
            `
            {data?.pages.map(page => (
              <div className="flex flex-col gap-[24px]" key={page.cursorId}>
                {page.reservations.map(reservation => (
                  <MyReservationItem
                    key={reservation.id}
                    statusTitle={statusTitle ?? ""}
                    reservation={reservation}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-grow flex-col items-center justify-center tablet:w-[800px]">
          <Image src="/images/empty.png" alt="빈 이미지" width={240} height={240} />
          <p className="text-2xl font-medium text-gray-500">아직 예약한 체험이 없어요</p>
        </div>
      )}
    </div>
  );
}

export default MyReservations;
