"use client";

import { Reservations } from "@/apis/API.type";

function MyReservationItem({ reservation }: { reservation: Reservations }) {
  return <div className="w-[800px]">{reservation.id}</div>;
}

export default MyReservationItem;
