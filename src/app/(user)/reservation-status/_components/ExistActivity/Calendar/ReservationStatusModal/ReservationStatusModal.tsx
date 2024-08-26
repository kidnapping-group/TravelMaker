"use client";

import { StatusCount } from "@/apis/API.type";
import RequestStatus from "@/app/(user)/reservation-status/_components/ExistActivity/Calendar/ReservationStatusModal/RequestStatus";
import ReservationList from "@/app/(user)/reservation-status/_components/ExistActivity/Calendar/ReservationStatusModal/ReservationList";
import formatDateToYYYYMMDD from "@/app/(user)/reservation-status/utils/formatDateToYYYYMMDD";
import { getMyActivityDateReservationStatus } from "@/app/(user)/reservation-status/utils/reservationStatus";
import Dropdown from "@/components/Dropdown";
import Modal from "@/components/Modal";
import formatDateToKorean from "@/utils/formatDateToKorean";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";

interface ReservationStatusModalProps {
  activityId: number;
  selectedDate: Date;
}

function ReservationStatusModal({ activityId, selectedDate }: ReservationStatusModalProps) {
  const [selectedTime, setSelectedTime] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState<keyof StatusCount>("pending");
  const params = {
    activityId,
    date: formatDateToYYYYMMDD(selectedDate),
  };
  const { data: dateReservation } = useSuspenseQuery(getMyActivityDateReservationStatus(params));

  const koreanDateFormat = formatDateToKorean(selectedDate);

  const dropdownItem = dateReservation.map(({ startTime, endTime }) => `${startTime} ~ ${endTime}`);

  const handleChangeDropdown = (item: string) => {
    const startEndTimes = item.split("~");

    const dateReservationIndex = dateReservation.findIndex(
      ({ startTime, endTime }) => startTime === startEndTimes[0] && endTime === startEndTimes[1],
    );

    setSelectedTime(dateReservationIndex);
  };

  return (
    <Modal title="예약 정보">
      <div className="flex flex-col gap-6 px-6 pb-6">
        {dateReservation && (
          <RequestStatus
            statusCount={dateReservation[selectedTime]?.count}
            setSelectedStatus={setSelectedStatus}
            selectedStatus={selectedStatus}
          />
        )}
        <div>
          <h2 className="text-xl font-semibold">예약 날짜</h2>
          <p className="mt-4 text-xl font-normal">{koreanDateFormat}</p>
          <Dropdown wide menuItems={dropdownItem} onChangeDropdown={handleChangeDropdown} />
        </div>
        <div>
          <h2 className="text-xl font-semibold">예약 내역</h2>
          <ReservationList
            activityId={activityId}
            scheduleId={dateReservation[selectedTime]?.scheduleId}
            status={selectedStatus}
          />
        </div>
      </div>
    </Modal>
  );
}

export default ReservationStatusModal;
