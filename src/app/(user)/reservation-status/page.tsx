import ReservationStatus from "@/app/(user)/reservation-status/_components/ReservationStatus";
import { getMyActivities } from "@/app/(user)/reservation-status/utils/reservationStatus";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { cookies } from "next/headers";

export const metadata = {
  title: "예약 현황",
  description: "내 체험의 예약 현황을 확인하세요.",
  openGraph: {
    title: "예약 현황",
    description: "내 체험의 예약 현황을 확인하세요.",
    url: "https://travel-kidnap-maker.vercel.app/reservation-status",
  },
};

async function ReservationStatusPage() {
  const queryClient = new QueryClient();
  const accessToken = cookies().get("accessToken");

  if (accessToken) {
    await queryClient.prefetchQuery(getMyActivities);
  }
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ReservationStatus />
    </HydrationBoundary>
  );
}

export default ReservationStatusPage;
