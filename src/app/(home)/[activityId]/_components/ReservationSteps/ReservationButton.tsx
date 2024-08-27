import useControlPopup from "@/app/(home)/[activityId]/_hooks/useControlPopup";
import { Button } from "@/components/Button";
import Popup, { closePopup, openPopup } from "@/components/Popup";
import { useRouter } from "next/navigation";

interface ReservationButtonProps {
  submitReservation: () => void;
}

function ReservationButton({ submitReservation }: ReservationButtonProps) {
  const router = useRouter();
  const { isLogin, isUser } = useControlPopup();

  const createReservationPopup = () => {
    if (!isLogin) {
      openPopup("reservationNoUser");
    } else if (isUser) {
      openPopup("reservationBanSelfing");
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
        id="reservationBanSelfing"
        text="본인의 체험은 예약이 불가능합니다."
        leftButton="확인"
        onChangeLeftButton={() => closePopup("reservationBanSelfing")}
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
