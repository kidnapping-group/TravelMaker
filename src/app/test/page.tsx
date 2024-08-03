"use server";

import Dropdown from "@/components/Dropdown";
import { redirect } from "next/navigation";

const menuItems = ["전체 예약", "예약 신청", "예약 취소", "예약 승인", "예약 거절", "체험 완료"];

async function handleServerAction(status: string) {
  "use server";

  // 서버액션을 위해 추가한 지시어
  redirect(`/test?status=${status}`);
}

function Page({ searchParams }: { searchParams: { status: string } }) {
  let selectedStatus = searchParams.status;

  return (
    <div>
      드롭 다운 조지기! selectedStatus: {selectedStatus}
      <Dropdown
        menuItems={menuItems}
        type="square"
        onChangeDropdown={handleServerAction}
        placeHolder="category"
      />
    </div>
  );
}

export default Page;
