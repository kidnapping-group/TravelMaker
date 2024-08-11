function FreeReservationTime({ reservationTimes }: { reservationTimes: string[][] }) {
  return (
    <div>
      <h2 className="mt-4">예약 가능한 시간</h2>
      <div className="mt-3 grid w-fit grid-cols-2 gap-3">
        {reservationTimes.map(item => (
          <button
            key={item.join("~")}
            type="button"
            className="flex h-11 w-28 items-center justify-center rounded-lg border border-primary-400 text-lg font-medium text-primary-400 hover:bg-primary-400 hover:text-white"
          >
            {item.join("~")}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FreeReservationTime;
