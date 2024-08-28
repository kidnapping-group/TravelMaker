"use client";

import ExistActivity from "@/app/(user)/reservation-status/_components/ExistActivity";
import NoExistActivity from "@/app/(user)/reservation-status/_components/NoExistActivity";
import { getMyActivities } from "@/app/(user)/reservation-status/utils/reservationStatus";
import { useSuspenseQuery } from "@tanstack/react-query";

function ReservationStatus() {
  const { data } = useSuspenseQuery(getMyActivities);

  return (
    <>
      <h1 className="mb-5 text-2xl font-bold">예약 현황</h1>
      {data.totalCount ? <ExistActivity activities={data.activities} /> : <NoExistActivity />}
    </>
  );
}

export default ReservationStatus;
