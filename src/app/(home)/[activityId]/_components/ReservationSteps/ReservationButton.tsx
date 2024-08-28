import useControlPopup from "@/app/(home)/[activityId]/_hooks/useControlPopup";
import useErrorPopupConfig from "@/app/(home)/[activityId]/_hooks/useErrorPopupConfig";
import { Button } from "@/components/Button";
import Popup, { closePopup, openPopup } from "@/components/Popup";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export interface ReservationButtonProps {
  submitReservation: () => void;
  isError: boolean;
  error: Error | null;
}

function ReservationButton({ submitReservation, isError, error }: ReservationButtonProps) {
  const router = useRouter();
  const { isLogin, isUser } = useControlPopup();
  const { errorMessage, setErrorMessage, handleErrorPopup } = useErrorPopupConfig(error);

  const createReservationPopup = () => {
    if (!isLogin) {
      openPopup("reservationNoUser");
    } else if (isUser) {
      openPopup("reservationBanSelfing");
    } else if (isError) {
      handleErrorPopup();
    } else {
      submitReservation();
    }
  };

  useEffect(() => {
    if (isError && error) {
      handleErrorPopup();
    }
  }, [isError, error, handleErrorPopup]);

  return (
    <div className="sticky bottom-0 w-full bg-white px-4 pb-8 tablet:relative">
      <Popup
        id="reservationNoUser"
        text="로그인 후에 예약이 가능합니다."
        leftButton="확인"
        onChangeLeftButton={() => closePopup("reservationNoUser")}
        rightButton="로그인"
        onChangeRightButton={() => router.push("/signin", { scroll: true })}
      />
      <Popup
        id="reservationBanSelfing"
        text="본인의 체험은 예약이 불가능합니다."
        leftButton="확인"
        onChangeLeftButton={() => closePopup("reservationBanSelfing")}
      />
      <Popup
        id="reservationSuccess"
        text={`예약을 성공했습니다.\n예약 페이지로 이동 하겠습니까?`}
        leftButton="아니요"
        onChangeLeftButton={() => closePopup("reservationSuccess")}
        rightButton="이동하기"
        onChangeRightButton={() => router.push("/reservations")}
      />
      {errorMessage && (
        <Popup
          id={errorMessage}
          text={errorMessage}
          leftButton="확인"
          onChangeLeftButton={() => {
            closePopup(errorMessage);
            setErrorMessage("");
          }}
          rightButton={
            errorMessage === "이미 예약한 일정입니다." ? "예약 페이지로 이동" : undefined
          }
          onChangeRightButton={
            errorMessage === "이미 예약한 일정입니다."
              ? () => {
                  closePopup(errorMessage);
                  setErrorMessage("");
                  router.push("/reservations");
                }
              : undefined
          }
        />
      )}
      <Button size="wide" onClick={createReservationPopup}>
        예약하기
      </Button>
    </div>
  );
}

export default ReservationButton;
