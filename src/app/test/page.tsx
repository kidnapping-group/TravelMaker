import Popup, { openPopup } from "@/app/components/Popup";
import { redirect } from "next/navigation";

function Page({ searchParams }: { searchParams: { confirm: string } }) {
  const { confirm } = searchParams;

  if (confirm) {
    redirect("/signin");
  }
  return (
    <div>
      test
      <button type="button" onClick={openPopup}>
        팝업 버튼
      </button>
      <Popup text="일치하는 회원 정보가 없습니다." onCloseButton="확인" />
      <Popup text="예약을 취소하시겠습니까?" onCloseButton="아니오" onChangeButton="취소" />
    </div>
  );
}

export default Page;
