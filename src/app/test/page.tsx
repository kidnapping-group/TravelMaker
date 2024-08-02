"use server";

import Dropdown from "@/components/Dropdown";
import { redirect } from "next/navigation";

const menuItems = [
  { title: "전체 예약", status: "" },
  { title: "예약 신청", status: "pending" },
  { title: "예약 취소", status: "confirmed" },
  { title: "예약 승인", status: "declined" },
  { title: "예약 거절", status: "canceled" },
  { title: "체험 완료", status: "completed" },
];

async function handleServerAction(status: string) {
  "use server";

  redirect(`/test?status=${status}`);
}

function Page({ searchParams }: { searchParams: { status: string } }) {
  let selectedStatus = searchParams.status;

  return (
    <div>
      드롭 다운 조지기! selectedStatus: {selectedStatus}
      <Dropdown menuItems={menuItems} type="selector" onChangeDropdown={handleServerAction} />
    </div>
  );
}

export default Page;
