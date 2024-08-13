"use client";

import { ReservationRes } from "@/apis/API.type";
import myReservationAPI from "@/apis/myReservationAPI";
import Dropdown from "@/components/Dropdown";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";

function MyReservations() {
  const menuItems = ["all", "pending", "confirmed", "declined", "canceled", "completed"];
  const [status, setStatus] = useState<string | undefined>();

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
  const { data } = MyReservation();
  const handleSelectStatus = (selectStatus: string) => {
    if (selectStatus === "all") {
      setStatus(undefined);
    } else {
      setStatus(selectStatus);
    }
  };
  return (
    <div>
      <Dropdown
        menuItems={menuItems}
        type="round"
        onChangeDropdown={handleSelectStatus}
        placeHolder="필터"
      />
      {data?.pages.map(page => (
        <div key={crypto.randomUUID()}>
          {page.reservations.map(reservation => (
            <div key={reservation.id}>{reservation.id}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default MyReservations;
