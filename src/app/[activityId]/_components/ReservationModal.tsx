"use client";

import activitiesAPI from "@/apis/activitiesAPI";
import Calendar from "@/app/[activityId]/_components/Calendar";
import { activityIdOptions } from "@/app/[activityId]/activityId";
import { Button } from "@/components/Button";
import Modal from "@/components/Modal";
import formatKoreanWon from "@/utils/formatKoreanWon";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

function ReservationModal({ activityId }: { activityId: string }) {
  const { data } = useSuspenseQuery(activityIdOptions(activityId));
  const [selectedDate, setSelectedDate] = useState<string>();
  const [population, setPopulation] = useState(1);

  const reservationTime = data.schedules
    .filter(item => item.date === selectedDate)
    .map(item => [item.startTime, item.endTime]);

  const reservationId = data.schedules.find(item => item.date === selectedDate)?.id || null;

  const submitReservation = async () => {
    if (reservationId !== null) {
      await activitiesAPI.postReservations(Number(activityId), {
        scheduleId: reservationId,
        headCount: population,
      });
    }
  };

  return (
    <Modal title={`${formatKoreanWon(data.price)} / 인`}>
      <div className="px-4 pb-[88px] text-2lg font-bold">
        <div className="border-t" />
        <h2 className="mt-4">날짜</h2>
        <div className="mt-4">
          <Calendar scheduleData={data.schedules} setSelectedDate={setSelectedDate} />
        </div>
        <h2 className="mt-4">예약 가능한 시간</h2>
        <div className="mt-3 grid w-fit grid-cols-2 gap-3">
          {reservationTime.map(item => (
            <button
              key={item.join("~")}
              type="button"
              className="flex h-11 w-28 items-center justify-center rounded-lg border border-primary-400 text-lg font-medium text-primary-400 hover:bg-primary-400 hover:text-white"
            >
              {item.join("~")}
            </button>
          ))}
        </div>
        <div className="mt-4 border-t" />
        <h2 className="mt-4">참여 인원</h2>
        <div className="mt-4 flex w-fit rounded-md border">
          <button
            type="button"
            onClick={() => setPopulation(prev => Math.max(1, prev - 1))}
            className="p-[10px]"
          >
            <Image src="icons/icon-minus.svg" alt="빼기" width={20} height={20} />
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center text-gray-700"
          >
            {population}
          </button>
          <button
            type="button"
            onClick={() => setPopulation(prev => Math.min(99, prev + 1))}
            className="p-[10px]"
          >
            <Image src="icons/icon-add.svg" alt="더하기" width={20} height={20} />
          </button>
        </div>
        <div className="mt-4 border-t" />
        <div className="mt-4 flex items-center justify-between">
          <h2>총 합계</h2>
          <p>{formatKoreanWon(data.price * population)}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={submitReservation}
        className="fixed bottom-0 w-full bg-white px-4 pb-8"
      >
        <Button size="wide">예약하기</Button>
      </button>
    </Modal>
  );
}

export default ReservationModal;
