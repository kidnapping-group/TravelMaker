import useControlPopup from "@/app/[activityId]/_hooks/useControlPopup";
import { Button } from "@/components/Button";
import Popup, { closePopup, openPopup } from "@/components/Popup";
import { useRouter } from "next/navigation";

function ReservationButton({ submitReservation }: { submitReservation: () => void }) {
  const router = useRouter();
  const { isReservation, userId } = useControlPopup();

  const createReservationPopup = () => {
    if (!userId) {
      openPopup("reservationNoUser");
    } else if (isReservation) {
      openPopup("reservationEndActivity");
    } else {
      openPopup("reservationSuccess");
      submitReservation();
    }
  };

  return (
    <div className="sticky bottom-0 w-full bg-white px-4 pb-8 tablet:relative">
      <Popup
        id="reservationNoUser"
        text="로그인 후에 예약이 가능합니다."
        leftButton="확인"
        onChangeLeftButton={() => closePopup("reservationNoUser")}
        rightButton="로그인"
        onChangeRightButton={() => router.push("/signin")}
      />
      <Popup
        id="reservationEndActivity"
        text="해당 날짜는 이미 체험이 종료됬습니다."
        leftButton="확인"
        onChangeLeftButton={() => closePopup("reservationEndActivity")}
      />
      <Popup
        id="reservationSuccess"
        text={`예약을 성공했습니다.\n예약 페이지로 이동 하겠습니까?`}
        leftButton="거절한다"
        onChangeLeftButton={() => closePopup("reservationSuccess")}
        rightButton="이동하기"
        onChangeRightButton={() => router.push("/reservations")}
      />
      <Button size="wide" onClick={createReservationPopup}>
        예약하기
      </Button>
    </div>
  );
}

export default ReservationButton;
