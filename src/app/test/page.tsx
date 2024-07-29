"use server";

import DropDown from "@/app/components/DropDown";

// 심각한 문제는 실제 상황에서는 use server 상태라 훅 못쓸꺼야 승헌님께 조언구하자
// searchParams나 전역 변수 넘겨주기 둘중 하나밖에 안떠올라.
const mockData = [
  { title: "예약 신청", color: "yellow" },
  { title: "예약 취소", color: "red" },
  { title: "예약 승인", color: "brown" },
  { title: "예약 거절", color: "green" },
  { title: "체험 완료", color: "blue" },
];

function Page({ searchParams }: { searchParams: { status?: string } }) {
  let status = searchParams.status || "예약 현황";

  return (
    <div>
      드롭 다운 조지기!
      <DropDown status={status} mockData={mockData} />
    </div>
  );
}

export default Page;
