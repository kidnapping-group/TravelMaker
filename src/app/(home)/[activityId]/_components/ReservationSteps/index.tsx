"use client";

import { useState } from "react";

import { useActivityId } from "../../_contexts/ActivityIdContext";
import useActivityPopulation from "../../_hooks/useActivityPopulation";
import useGetActivityReservationStepsViewModel from "../../_hooks/useGetActivityReservationStepsViewModel";
import usePostReservationMutation from "../../_hooks/usePostReservationMutation";
import Calendar from "./Calendar";
import FreeReservationTime from "./FreeReservationTime";
import ReservationButton from "./ReservationButton";
import TotalMoney from "./TotalMoney";

function ReservationSteps() {
  const { activityId } = useActivityId();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const { population, populationActions } = useActivityPopulation();
  const { reservationTimes, schedules, price, totalPrice, scheduleTime } =
    useGetActivityReservationStepsViewModel(selectedDate, selectedTime);
  const { postReservationMutation, isError, error } = usePostReservationMutation(
    activityId,
    scheduleTime,
    population,
  );

  const handleDateSelection = (date: string, hasReservation: boolean) => {
    setSelectedDate(hasReservation ? date : "");
  };

  const submitReservation = () => {
    postReservationMutation.mutate();
  };

  return (
    <div className="bg-white px-4 text-2lg font-bold tablet:rounded-lg tablet:pt-4">
      <h1 className="hidden items-center text-[28px] font-bold tablet:flex">
        {totalPrice}
        <span className="text-lg font-normal">&nbsp;/ 인</span>
      </h1>
      <Calendar scheduleData={schedules} setSelectedDate={handleDateSelection} />
      {selectedDate && (
        <FreeReservationTime
          reservationTimes={reservationTimes}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
      )}
      <TotalMoney population={population} populationActions={populationActions} price={price} />
      <ReservationButton submitReservation={submitReservation} isError={isError} error={error} />
    </div>
  );
}

export default ReservationSteps;
