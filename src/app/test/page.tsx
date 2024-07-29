"use server";

import Dropdown from "@/app/components/Dropdown";

// 심각한 문제는 실제 상황에서는 use server 상태라 훅 못쓸꺼야 승헌님께 조언구하자
// searchParams나 전역 변수 넘겨주기 둘중 하나밖에 안떠올라.
// status프롭을 status로 정제 잘해서 내려줘야함.
// 가격순 할 때는 searchParams 받고, 이거를 sort값으로 바꿔줘야함 하..
// status순 할 때는 쿼리파람 줘야함.
const menuItems = [
  { title: "전체 예약", status: "" },
  { title: "예약 신청", status: "pending" },
  { title: "예약 취소", status: "confirmed" },
  { title: "예약 승인", status: "declined" },
  { title: "예약 거절", status: "canceled" },
  { title: "체험 완료", status: "completed" },
];

async function Page({ searchParams }: { searchParams: { status?: string } }) {
  let selectedStatus = searchParams;
  // if (status) {
  //   await getActivity({ selectedStatus });
  // } else {
  //   await getActivity();
  // }
  return (
    <div>
      드롭 다운 조지기!
      <Dropdown menuItems={menuItems} type="dropdown" />
    </div>
  );
}

export default Page;
