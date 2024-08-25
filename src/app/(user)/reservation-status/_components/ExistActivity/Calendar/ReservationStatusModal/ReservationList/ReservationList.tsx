"use client";

import { StatusCount } from "@/apis/API.type";
import ReservationItem from "@/app/(user)/reservation-status/_components/ExistActivity/Calendar/ReservationStatusModal/ReservationList/ReservationItem";
import { getMyActivityTimeReservationStatus } from "@/app/(user)/reservation-status/reservationStatus";
import { useSuspenseQuery } from "@tanstack/react-query";

interface ReservationListProps {
  activityId: number;
  scheduleId: number;
  status: keyof StatusCount;
}

function ReservationList({ activityId, scheduleId, status }: ReservationListProps) {
  const { data: timeReservation } = useSuspenseQuery(
    getMyActivityTimeReservationStatus({ activityId, scheduleId, status, size: 999 }),
  );

  if (!timeReservation.reservations.length) return null;

  return (
    <div className="flex max-h-[346px] flex-col gap-4 overflow-y-auto">
      {timeReservation.reservations.map(reservation => (
        <ReservationItem key={reservation.id} reservation={reservation} status={status} />
      ))}
    </div>
  );
}

export default ReservationList;
