"use server";

import Dropdown from "@/components/Dropdown";

const menuItems = [
  { title: "전체 예약", status: "" },
  { title: "예약 신청", status: "pending" },
  { title: "예약 취소", status: "confirmed" },
  { title: "예약 승인", status: "declined" },
  { title: "예약 거절", status: "canceled" },
  { title: "체험 완료", status: "completed" },
];

async function Page({ searchParams }: { searchParams: { status: string } }) {
  let selectedStatus = searchParams.status;
  // if (status) {
  //   await getActivity({ selectedStatus });
  // } else {
  //   await getActivity();
  // }
  return (
    <div>
      드롭 다운 조지기! selectedStatus: {selectedStatus}
      <Dropdown menuItems={menuItems} type="selector" />
    </div>
  );
}

export default Page;
