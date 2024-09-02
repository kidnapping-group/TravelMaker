import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

import myReservationAPI from "@/apis/myReservationAPI";

import MyReservations from "./_components/MyReservations";

export const metadata = {
  title: "예약 내역",
  description: "내가 예약한 체험을 확인하세요.",
  openGraph: {
    title: "예약 내역",
    description: "내가 예약한 체험을 확인하세요.",
    url: "https://travel-kidnap-maker.vercel.app/reservations",
  },
};

async function Reservations() {
  const status = undefined;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["myReservations", { size: 10, status }],
    queryFn: () => myReservationAPI.get({ cursorId: undefined, size: 10, status }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyReservations />
    </HydrationBoundary>
  );
}

export default Reservations;
