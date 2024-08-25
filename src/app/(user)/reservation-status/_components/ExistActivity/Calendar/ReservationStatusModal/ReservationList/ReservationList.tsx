"use client";

import { StatusCount } from "@/apis/API.type";
import ReservationItem from "@/app/(user)/reservation-status/_components/ExistActivity/Calendar/ReservationStatusModal/ReservationList/ReservationItem";
import { getMyActivityTimeReservationStatus } from "@/app/(user)/reservation-status/reservationStatus";
import { useSuspenseQuery } from "@tanstack/react-query";

export type Status = keyof StatusCount;

interface ReservationListProps {
  activityId: number;
  scheduleId: number;
  status: Status;
}

function ReservationList({ activityId, scheduleId, status }: ReservationListProps) {
  const { data: timeReservation } = useSuspenseQuery(
    getMyActivityTimeReservationStatus({ activityId, scheduleId, status, size: 999 }),
  );

  return (
    <div className="flex max-h-[346px] flex-col gap-4 overflow-y-auto">
      {timeReservation.reservations.length ? (
        timeReservation.reservations.map(reservation => (
          <ReservationItem key={reservation.id} reservation={reservation} />
        ))
      ) : (
        <p>예약 내역이 없군요!</p>
      )}
    </div>
  );
}

export default ReservationList;
