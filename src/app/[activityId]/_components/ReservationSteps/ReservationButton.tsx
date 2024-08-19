import useControlPopup from "@/app/[activityId]/_hooks/useControlPopup";
import { Button } from "@/components/Button";
import Popup, { closePopup, openPopup } from "@/components/Popup";
import { useRouter } from "next/navigation";

interface ReservationButtonProps {
  submitReservation: () => void;
}

function ReservationButton({ submitReservation }: ReservationButtonProps) {
  const router = useRouter();
  const { isReservation, isLogin } = useControlPopup();

  const createReservationPopup = () => {
    if (!isLogin) {
      openPopup("reservationNoUser");
    } else if (isReservation) {
      openPopup("reservationEndActivity");
    } else {
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
        id="reservationIdNull"
        text="해당 날짜는 예약 가능한 시간이 없습니다."
        leftButton="확인"
        onChangeLeftButton={() => closePopup("reservationIdNull")}
      />
      <Popup
        id="reservationAlready"
        text={`이미 등록된 예약입니다.\n예약 페이지로 이동 하겠습니까?`}
        leftButton="아니요"
        onChangeLeftButton={() => closePopup("reservationAlready")}
        rightButton="이동하기"
        onChangeRightButton={() => router.push("/reservations")}
      />
      <Popup
        id="reservationSuccess"
        text={`예약을 성공했습니다.\n예약 페이지로 이동 하겠습니까?`}
        leftButton="아니요"
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
