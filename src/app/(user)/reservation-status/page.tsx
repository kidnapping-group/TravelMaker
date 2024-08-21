import ReservationStatus from "@/app/(user)/reservation-status/_components/ReservationStatus";
import { getMyActivities } from "@/app/(user)/reservation-status/reservationStatus";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

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
