"use client";

import ExistActivity from "@/app/(user)/reservation-status/_components/ExistActivity";
import NoExistActivity from "@/app/(user)/reservation-status/_components/NoExistActivity";
import { getMyActivities } from "@/app/(user)/reservation-status/reservationStatus";
import { useSuspenseQuery } from "@tanstack/react-query";

function ReservationStatus() {
  const { data } = useSuspenseQuery(getMyActivities);

  return (
    <div className="max-h-full overflow-y-auto">
      <h1 className="text-3xl font-bold">예약 현황</h1>
      {data.totalCount ? <ExistActivity activities={data.activities} /> : <NoExistActivity />}
    </div>
  );
}

export default ReservationStatus;
