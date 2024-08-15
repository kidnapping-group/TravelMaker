import { useState } from "react";

function FreeReservationTime({ reservationTimes }: { reservationTimes: string[][] }) {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleTimeSelection = (time: string) => {
    setSelectedTime(time === selectedTime ? null : time);
  };

  return (
    <div>
      <h2 className="mt-4">예약 가능한 시간</h2>
      <div className="mt-3 grid w-fit grid-cols-2 gap-3">
        {reservationTimes.map(item => {
          const timeString = item.join("~");
          const isSelected = selectedTime === timeString;
          return (
            <button
              key={crypto.randomUUID()}
              type="button"
              onClick={() => handleTimeSelection(timeString)}
              className={`flex h-11 w-28 items-center justify-center rounded-lg border border-primary-400 text-lg font-medium ${
                isSelected ? "bg-primary-400 text-white" : "text-primary-400"
              }`}
            >
              {timeString}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default FreeReservationTime;
