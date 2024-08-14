"use client";

import Calendar from "@/app/[activityId]/_components/ReservationSteps/Calendar";
import FreeReservationTime from "@/app/[activityId]/_components/ReservationSteps/FreeReservationTime";
import ReservationButton from "@/app/[activityId]/_components/ReservationSteps/ReservationButton";
import TotalMoney from "@/app/[activityId]/_components/ReservationSteps/TotalMoney";
import { useActivityId } from "@/app/[activityId]/_contexts/ActivityIdContext";
import useActivityPopulation from "@/app/[activityId]/_hooks/useActivityPopulation";
import useGetActivityReservationStepsViewModel from "@/app/[activityId]/_hooks/useGetActivityReservationStepsViewModel";
import usePostReservationMutation from "@/app/[activityId]/_hooks/usePostReservationMutation";
import Popup, { closePopup } from "@/components/Popup";
import { useRouter } from "next/navigation";
import { useState } from "react";

function ReservationSteps() {
  const { activityId } = useActivityId();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState("");
  const { population, populationActions } = useActivityPopulation();
  const { reservationTimes, reservationId, schedules, price, totalPrice } =
    useGetActivityReservationStepsViewModel(selectedDate);
  const { postReservationMutation } = usePostReservationMutation(
    activityId,
    reservationId,
    population,
  );

  const handleDateSelection = (date: string, hasReservation: boolean) => {
    setSelectedDate(hasReservation ? date : "");
  };

  const submitReservation = () => {
    if (reservationId === null) return;
    postReservationMutation.mutate();
  };

  return (
    <div className="bg-white px-4 text-2lg font-bold tablet:rounded-lg tablet:pt-4">
      <h1 className="hidden items-center text-[28px] font-bold tablet:flex">
        {totalPrice}
        <span className="text-lg font-normal">&nbsp;/ 인</span>
      </h1>
      <Calendar scheduleData={schedules} setSelectedDate={handleDateSelection} />
      {selectedDate && <FreeReservationTime reservationTimes={reservationTimes} />}
      <TotalMoney population={population} populationActions={populationActions} price={price} />
      <ReservationButton submitReservation={submitReservation} />
      <Popup
        id="reservation"
        text={`예약을 성공했습니다.\n예약 페이지로 이동 하겠습니까?`}
        leftButton="거절한다"
        onChangeLeftButton={() => closePopup("reservation")}
        rightButton="이동하기"
        onChangeRightButton={() => router.push("reservations")}
      />
    </div>
  );
}

export default ReservationSteps;
