import { Button } from "@/components/Button";

function ReservationButton({ submitReservation }: { submitReservation: () => void }) {
  return (
    <div className="sticky bottom-0 w-full bg-white px-4 pb-8 tablet:relative">
      <Button size="wide" onClick={submitReservation}>
        예약하기
      </Button>
    </div>
  );
}

export default ReservationButton;
