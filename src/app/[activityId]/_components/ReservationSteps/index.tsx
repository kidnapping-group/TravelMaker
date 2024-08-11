"use client";

import activitiesAPI from "@/apis/activitiesAPI";
import Calendar from "@/app/[activityId]/_components/ReservationSteps/Calendar";
import FreeReservationTime from "@/app/[activityId]/_components/ReservationSteps/FreeReservationTime";
import ReservationButton from "@/app/[activityId]/_components/ReservationSteps/ReservationButton";
import TotalMoney from "@/app/[activityId]/_components/ReservationSteps/TotalMoney";
import { useActivityId } from "@/app/[activityId]/_contexts/ActivityIdContext";
import useActivityPopulation from "@/app/[activityId]/_hooks/useActivityPopulation";
import useGetActivityReservationStepsViewModel from "@/app/[activityId]/_hooks/useGetActivityReservationStepsViewModel";
import { useState } from "react";

function ReservationSteps() {
  const { activityId } = useActivityId();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const { population, populationActions } = useActivityPopulation();
  const { reservationTimes, reservationId, schedules, price, totalPrice } =
    useGetActivityReservationStepsViewModel(selectedDate);

  const submitReservation = async () => {
    if (reservationId === null) return;
    await activitiesAPI.postReservations(Number(activityId), {
      scheduleId: reservationId,
      headCount: population,
    });
  };

  return (
    <div className="px-4 text-2lg font-bold">
      <h1 className="hidden text-[28px] font-bold tablet:block">{totalPrice}</h1>
      <FreeReservationTime reservationTimes={reservationTimes} />
      <Calendar setSelectedDate={setSelectedDate} scheduleData={schedules} />
      <TotalMoney population={population} populationActions={populationActions} price={price} />
      <ReservationButton submitReservation={submitReservation} />
    </div>
  );
}

export default ReservationSteps;
