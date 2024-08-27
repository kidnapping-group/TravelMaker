import ReservationStatus from "@/app/(user)/reservation-status/_components/ReservationStatus";
import { getMyActivities } from "@/app/(user)/reservation-status/utils/reservationStatus";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

export const metadata = {
  title: "예약 현황",
  description: "내 체험의 예약 현황(승인, 거절, 완료)을 표시합니다.",
  openGraph: {
    title: "예약 현황 페이지",
    description: "내 체험의 예약 현황(승인, 거절, 완료)을 표시합니다.",
    url: "https://travel-kidnap-maker.vercel.app/reservation-status",
  },
};

async function ReservationStatusPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getMyActivities);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ReservationStatus />
    </HydrationBoundary>
  );
}

export default ReservationStatusPage;
