import Popup, { closePopup } from "@/components/Popup";

function DropdownMenuPopup({ onChangeRightButton }: { onChangeRightButton: () => void }) {
  return (
    <div>
      <Popup
        id="reservationPossible"
        text="소중한 체험을 삭제하시겠습니까?"
        leftButton="아니요"
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
