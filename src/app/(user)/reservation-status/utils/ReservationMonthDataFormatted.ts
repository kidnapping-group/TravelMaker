import { getReservationMonthRes } from "@/apis/API.type";

import { Reservation, ReservationStatus } from "../_components/ExistActivity/Calendar/Day";

const STATUS: Record<ReservationStatus, ReservationStatus> = {
  completed: "completed",
  confirmed: "confirmed",
  pending: "pending",
};

const ReservationMonthDataFormatted = (data: getReservationMonthRes[]) => {
  const formattedData: Record<number, Reservation[]> = {};
  data?.forEach(item => {
    const day = new Date(item.date).getDate();
    formattedData[day] = [
      { status: STATUS.completed, title: `완료 ${item.reservations.completed}` },
      { status: STATUS.confirmed, title: `승인 ${item.reservations.confirmed}` },
      { status: STATUS.pending, title: `예약 ${item.reservations.pending}` },
    ].filter(reservation => parseInt(reservation.title.split(" ")[1], 10) > 0);
  });
  return formattedData;
};

export default ReservationMonthDataFormatted;
