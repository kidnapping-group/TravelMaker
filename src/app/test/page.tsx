"use client";

import Popup, { closePopup, openPopup } from "@/components/Popup";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  return (
    <div>
      <div className="flex flex-col">
        <button type="button" onClick={() => openPopup("민첩")} className="text-red-500">
          민첩
        </button>
        <button type="button" onClick={() => openPopup("지능")} className="text-blue-500">
          지능
        </button>
      </div>
      <Popup
        id="민첩"
        text="민첩한 팝업"
        leftButton="왼쪽 버튼"
        onChangeLeftButton={() => closePopup("민첩")}
      />
      <Popup
        id="지능"
        text="교활한 팝업"
        leftButton="왼쪽 버튼"
        onChangeLeftButton={() => closePopup("지능")}
        rightButton="오른쪽 버튼"
        onChangeRightButton={() => router.push("/")}
      />
    </div>
  );
}

export default page;
