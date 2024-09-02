"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { getMyActivities } from "../utils/reservationStatus";
import ExistActivity from "./ExistActivity";
import NoExistActivity from "./NoExistActivity";

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
