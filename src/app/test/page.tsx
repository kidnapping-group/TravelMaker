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
      <Popup text="fdsavs" onCloseButton="확" />
    </div>
  );
}

export default Page;
