import Popup, { closePopup } from "@/components/Popup";
import { useRouter } from "next/navigation";

function DropdownMenuPopup({ onChangeRightButton }: { onChangeRightButton: () => void }) {
  const router = useRouter();

  return (
    <div>
      <Popup
        id="noUser"
        text="로그인 후에 삭제가 가능합니다."
        leftButton="확인"
        onChangeLeftButton={() => closePopup("noUser")}
        rightButton="로그인"
        onChangeRightButton={() => router.push("/signin")}
      />
      <Popup
        id="noMyActivity"
        text="본인의 체험만 삭제가 가능합니다."
        leftButton="확인"
        onChangeLeftButton={() => closePopup("noMyActivity")}
      />
      <Popup
        id="reservationPossible"
        text="소중한 체험을 삭제하시겠습니까?"
        leftButton="거절한다"
        onChangeLeftButton={() => closePopup("reservationPossible")}
        rightButton="삭제하기"
        onChangeRightButton={onChangeRightButton}
      />
      <Popup
        id="reservationImpossible"
        text={`체험이 만료되기 전에는\n삭제가 불가능합니다.`}
        leftButton="확인"
        onChangeLeftButton={() => closePopup("reservationImpossible")}
      />
    </div>
  );
}

export default DropdownMenuPopup;
